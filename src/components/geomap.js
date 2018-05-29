import React, {Component} from 'react';
import mapConfig from '../utils/maps';
import _ from 'lodash';
import classNames from 'classnames';
import {PulseLoader} from 'react-spinners';
import L from 'leaflet';
import { setActiveOverlay } from "../actions/index";
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {
  getEducationAttainmentGeoJson,
  getWACGeoJson,
  getDowtownWorkersGeoJson,
  getDiversityIndexGeoJson,
  getRentIncomeGeoJson,
  getCrimeGeoJson,
  getAmenitiesServicesGeoJsonLayers,
  getAmenitiesInfrasctructureGeoJsonLayers,
  getWelcomingGeoJsonLayers,
  getWelcomingDataGeoJsonLayers,
  getResidentialBuildingGeoJson
} from '../services/api';

require('leaflet-fullscreen');
require('leaflet-choropleth');
require('../utils/Control.OverlaySelect');
require('../utils/Control.SubOverlaySelect');


const southWest = L.latLng(43.2459282765, -82.3634857961),
  northEast = L.latLng(41.9394285862, -84.2834646531);
const overlayMapsStoryOne = {
  "Education Attainment": "Education Attainment",
  "Worker - Bachelor's": "Worker - Bachelor's",
  "Worker - Downtown": "Worker - Downtown",
  "Diversity Index": "Diversity Index",
  "Affordability": "Affordability",
  "Crime": "Crime",
};

const overlayMapsStoryTwo = {
  "Clean and Welcoming": "Clean and Welcoming",
  "Amenities": "Amenities",
  "Live Downtown": "Live Downtown"
};

const subOverlayMapsStoryTwo = {
  "Amenities": {
    "services": {
      "restaurants": {
        label: "restaurants",
        color: "#EF4060"
      },
      "retailers": {
        label: "retailers",
        color: "#00A992"
      },
      "parks": {
        label: "parks",
        color: "#F27B21"
      }
    },
    "infrastructure": {
      "parking garages": {
        label: "parking garages",
        color: "#F27B81"
      },
      "lighthouses": {
        label: "lighthouses",
        color: "#0039B1"
      },
      "MoGo stations": {
        label: "lighthouses",
        color: "#F47F51"
      }
    }
  }, "Clean and Welcoming": {
    "Business Contacts": {
      label: "Business Contacts",
      color: "#ADC8E7"
    },
    "Graffiti - Removed": {
      label: "Graffiti Removed",
      color: "#F27B21"
    },
    "Motorist Assist": {
      label: "Motorist Assist",
      color: "#EF4060"
    },
    "Panhandling": {
      label: "Panhandler Contacts",
      color: "#00B3EE"
    },
    "Pedestrian Assistance": {
      label: "Pedestrian Assist",
      color: "#E0E060"
    },
    "Trash (lbs)": {
      label: "Trash Pickup",
      color: "#00A992"
    }
  },
  "Live Downtown": {'2018': {}, '2019': {}, '2020': {}, '2021': {}, '2022': {}}
};

class GeoMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      chapter: props.chapter,
      lat: mapConfig.DETROIT_POSITION.lat,
      lng: mapConfig.DETROIT_POSITION.lng,
      overlaySelectControl: null,
      fullScreenControl: null,
      zoom: mapConfig.ZOOM_LEVEL,
      educationAttainmentGeoJson: {},
      rentIncomeMedianGeoJson: {},
      wacGeoJson: {},
      workersDowntownGeoData: {},
      diversityIndexGeoJson: {},
      geoJson: {},
      crimeGeoJson: {},
      selectedSublayer: '',
      currentSubLayerControl: null,
      map: {},
      overlayMaps: props.chapter.id === 1 ? overlayMapsStoryOne : overlayMapsStoryTwo,
      bounds: L.latLngBounds(southWest, northEast)
    };
  }


  setOverlayLayerZoom(overlayName, map) {
    map.setZoom(14);
  }

  getChoroplethGeoJson(overlayName, map) {
    if (overlayName === 'Education Attainment') {
      getEducationAttainmentGeoJson().then((data) => {
        this.addChoroplethLayer(data, mapConfig.educationAttainmentValProperty, mapConfig.educationAttainmentToolTip, map);
      });
    } else if (overlayName === "Worker - Bachelor's") {
      getWACGeoJson().then((data) => {
        this.addChoroplethLayer(data, mapConfig.wacValProperty, mapConfig.wacToolTip, map);
      });
    } else if (overlayName === "Worker - Downtown") {
      getDowtownWorkersGeoJson().then((data) => {
        this.addChoroplethLayer(data, mapConfig.workersDowntownProperty, mapConfig.workersDowntownToolTip, map);
      });
    } else if (overlayName === "Diversity Index") {
      getDiversityIndexGeoJson().then((data) => {
        this.addChoroplethLayer(data, mapConfig.diversityIndexProperty, mapConfig.diversityIndexToolTip, map);
      });
    } else if (overlayName === 'Affordability') {
      getRentIncomeGeoJson().then((data) => {
        this.addChoroplethLayer(data, mapConfig.rentIncomeProperty, mapConfig.rentIncomeToolTip, map);
      });
    } else if (overlayName === 'Crime') {
      getCrimeGeoJson().then((data) => {
        this.addChoroplethLayer(data, mapConfig.crimeIndexProperty, mapConfig.crimeIndexToolTip, map);
      });
    } else if (overlayName === 'Amenities') {
      this.getAmenitiesGeoJson(map);
    }
    else if (overlayName === 'Clean and Welcoming') {
      this.addWelcomingGeoJson(map)
    }
    else if (overlayName === 'Live Downtown') {
      this.getResidentialGeoJson(map)
    }
  }

  addWelcomingGeoJson(map) {
    const subOverlay = subOverlayMapsStoryTwo['Clean and Welcoming'];
    getWelcomingDataGeoJsonLayers().then(resp => {
      this.removeAllLayers();
      _.forEach(resp, (val, key) => {
        if (subOverlayMapsStoryTwo['Clean and Welcoming'].hasOwnProperty(key)) {
          this.addGeoJsonLayer(val, mapConfig.welcomingToolTip, subOverlay[key]['color'], map);
        }
      });
      getWelcomingGeoJsonLayers().then(geoJson => {
        _.forEach(geoJson, (val, key) => {
          if (key === 'landscaping') {
            this.addGeoJsonLayer(val, mapConfig.landscapingToolTip, "#F27B21", map);
          }
        });
        this.toggleLoader();
      })

    });

  }

  getAmenitiesGeoJson(map) {
    const subOverlay = subOverlayMapsStoryTwo['Amenities'];
    if (this.state.selectedSublayer === 'services') {
      getAmenitiesServicesGeoJsonLayers().then(resp => {
        this.removeAllLayers();

        _.forEach((resp), (val, key) => {
          if (key === 'restaurants') {
            this.addGeoJsonLayer(val, mapConfig.restaurantsToolTip, subOverlay[this.state.selectedSublayer][key]['color'], map);
          } else if (key === 'retailers') {
            this.addGeoJsonLayer(val, mapConfig.retailToolTip, subOverlay[this.state.selectedSublayer][key]['color'], map);
          }
          else if (key === 'parks') {
            this.addGeoJsonLayer(val, mapConfig.parksToolTip, subOverlay[this.state.selectedSublayer][key]['color'], map);
          }
        });
        this.toggleLoader();
      });
    } else if (this.state.selectedSublayer === 'infrastructure') {
      getAmenitiesInfrasctructureGeoJsonLayers().then(resp => {
        this.removeAllLayers();
        _.forEach((resp), (val, key) => {
          if (key === 'parking garages') {
            this.addGeoJsonLayer(val, mapConfig.parkingGarageToolTip, subOverlay[this.state.selectedSublayer][key]['color'], map);
          } else if (key === 'lighthouses') {
            this.addGeoJsonLayer(val, mapConfig.lighthousesToolTip, subOverlay[this.state.selectedSublayer][key]['color'], map);
          }
          else if (key === 'MoGo stations') {
            this.addGeoJsonLayer(val, mapConfig.mogoToolTip, subOverlay[this.state.selectedSublayer][key]['color'], map);
          }
        });
        this.toggleLoader();
      });
    }
  }

  getResidentialGeoJson(map) {
    getResidentialBuildingGeoJson(this.state.selectedSublayer).then(resp => {
      this.removeAllLayers();
      this.addGeoJsonLayer(resp, mapConfig.buildingsToolTip, '#F27B21', map);
      this.toggleLoader();
    });

  }

  toggleLoader() {
    this.setState({loading: !this.state.loading});
  }

  removeAllLayers() {
    this.state.map.eachLayer(function (layer) {
      if (layer.options['id'] !== 'mapbox.light') {
        layer.remove();
      }

    });
  }

  addGeoJsonLayer(data, tooltip, fillColor, map) {
    var geojsonMarkerOptions = {
      radius: 6,
      fillColor: fillColor,
      color: "#000",
      weight: 0,
      opacity: 1,
      border: 'none',
      fillOpacity: 1
    };
    L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
      },
      onEachFeature: tooltip
    }).addTo(map);

  }

  addChoroplethLayer(geoJson, valueProperty, toolTip, map) {
    this.removeAllLayers();
    L.choropleth(geoJson, {
      valueProperty: valueProperty,
      scale: ['white', 'green'], // chroma.js scale - include as many as you like
      steps: 5, // number of breaks or steps in range
      mode: 'q', // q for quantile, e for equidistant, k for k-means
      style: {
        color: '#fff', // border color
        weight: 2,
        fillOpacity: 0.6
      },
      overlayMaps: {},
      overlay: {},
      onEachFeature: toolTip
    }).addTo(map);
    this.toggleLoader();
  }


  componentDidMount() {
    this.map = L.map(this.container, {
      center: [this.state.lat, this.state.lng],
      zoom: this.state.zoom,
      maxZoom: 18,
      minZoom: 8,
      maxBounds: this.state.bounds,

    }, 100);
    L.tileLayer(mapConfig.MAPBOX_URL, {
      id: 'mapbox.light',
      attribution: mapConfig.MAPBOX_ATTRIBUTION,
    }).addTo(this.map);


    this.setOverlayMaps();

    this.addOverlaySelectControl(this.map);

    this.setSubOverlayControl(this.map);
    console.log("loading default layer", this.props.activeOverlay);
    this.loadDefaultLayer(this.props.activeOverlay, this.map);
    this.map.on('overlayChange', () => {
      this.toggleLoader();
      // this.props.setActiveOverlay(this.map.selectedOverlayLayerName());
      this.getChoroplethGeoJson(this.map.selectedOverlayLayerName(), this.map);
      this.setOverlayLayerZoom(this.map.selectedOverlayLayerName(), this.map);
      if (this.state.chapter.id === 2) {
        this.addSubOverlayControl(this.map);
      }
    });

    this.setState({map: this.map});


  }

  loadDefaultLayer(overlayName, map) {
    this.toggleLoader();
    this.getChoroplethGeoJson(overlayName, map);
    this.setOverlayLayerZoom(overlayName, map);
  }
  addOverlaySelectControl(map){
    if(this.state.overlaySelectControl !== null) {
      this.state.overlaySelectControl.remove()
    }
    const overlaySelectControl = L.control.overlayselect({
      overlays: this.state.overlayMaps
    }).addTo(map);
    if(this.state.fullScreenControl !== null) {
      this.state.fullScreenControl.remove();
    }
    const fullScreenControl =  new L.Control.Fullscreen({position: 'topright'}).addTo(map);//map.addControl(new L.Control.Fullscreen({position: 'topright'}));
    this.setState({overlaySelectControl, fullScreenControl});
  }
  addSubOverlayControl(map) {
    let options = null;
    if (this.props.activeOverlay === 'Amenities') {
      options = {
        overlays: subOverlayMapsStoryTwo['Amenities'],
        selected: "services"
      }
    } else if (this.props.activeOverlay === 'Clean and Welcoming') {
      options = {
        overlays: subOverlayMapsStoryTwo['Clean and Welcoming'],
        enableSwitcher: false
      }
    } else if (this.props.activeOverlay === 'Live Downtown') {
      options = {
        overlays: subOverlayMapsStoryTwo['Live Downtown'],
        enableSwitcher: true,
        enableSubOverlay: false,
        selected: "2018"
      }
    }

    if(this.state.chapter.id === 2){
      const subLayerControl = L.control.suboverlayselect(options).addTo(map);
      this.setState({currentSubLayerControl: subLayerControl})
    }

  }

  componentWillUnmount() {
    this.state.map.remove()
  }

  updateMapControls(){
    this.addOverlaySelectControl(this.state.map);
    this.setSubOverlayControl(this.state.map);
    this.loadDefaultLayer(this.props.activeOverlay, this.map);
  }

  setOverlayMaps() {
    if (this.state.chapter.id === 1) {
      this.setState({overlayMaps: overlayMapsStoryOne},  function() {this.updateMapControls()});
    } else if (this.state.chapter.id === 2) {
      this.setState({
        overlayMaps: overlayMapsStoryTwo,
        selectedSublayer: 'services'},  function() {this.updateMapControls()});
    }
  }

  setSubOverlayControl(map) {
    if (this.state.currentSubLayerControl !== null) {
      this.state.currentSubLayerControl.remove();
    }
    if (this.state.chapter.id === 2) {
      this.addSubOverlayControl(map);
      map.on('overlayGroupChange', () => {
        this.toggleLoader();
        this.setState({selectedSublayer: map.selectedOverlayGroupName()});
        this.getAmenitiesGeoJson(map);
        if (map.selectedOverlayLayerName() === 'Live Downtown') {
          this.getResidentialGeoJson(map)
        }

      });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("Chapter changed", nextProps.chapter);
    console.log("Substory Chapter changed", nextProps.activeOverlay);
    this.setState({chapter: nextProps.chapter}, function(){this.setOverlayMaps()});
  }

  render() {
    let loaderClass = classNames({
      'sweet-loading': true,
      'hidden': !this.state.loading
    });
    return (
      <div className={"map-holder"}>
        <div className={loaderClass}>
          <PulseLoader
            color={'#00A0DF'}
            loading={this.state.loading}
          />
        </div>
        <div className="map" ref={ref => this.container = ref}/>
      </div>

    )
  }

}

function mapStateToProps(state) {
  return {
    activeOverlay: state.activeOverlay
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setActiveOverlay: setActiveOverlay }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(GeoMap);