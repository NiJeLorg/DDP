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
        label: "Parks Maintained",
        color: "#F27B21"
      }
    },
    "infrastructure": {
      "parking garages": {
        label: "parking garages",
        color: "#F27B81"
      },
      "lighthouses": {
        label: "Project Lighthouse stations",
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
    // "Panhandling": {
    //   label: "Panhandler Contacts",
    //   color: "#00B3EE"
    // },
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

const overlayMapsStoryThree = {
  "How is the BIZ Funded?": "How is the BIZ Funded?"
};

const subOverlayMapsStoryThree = {
  "parcels": {
    "$1 - $1K": {
      label: "$1 - $1K",
      color: "#F27B1F"
    },
    "$1K - $10K": {
      label: "$1K - $10K",
      color: "#B2B5D3"
    },
    "$10K - $50K": {
      label: "$10K - $50K",
      color: "#5C6298"
    },
    "$50K - $150K": {
      label: "$50K - $150K",
      color: "#2A316C"
    },
    "$150K": {
      label: "$150K",
      color: "#0B103F"
    },
    "Not Assessed": {
      label: "Not Assessed",
      color: "#888"
    },
  }
};

class GeoMap extends Component {

  constructor(props) {
    let overlayMaps;
    if (props.chapter.id === 1) {
      overlayMaps = overlayMapsStoryOne;
    } else if (props.chapter.id === 2) {
      overlayMaps = overlayMapsStoryTwo;
    } else if (props.chapter.id === 3) {
      overlayMaps = overlayMapsStoryThree;
    }
    super(props);
    this.state = {
      loading: false,
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
      overlayMaps: overlayMaps,
      bounds: L.latLngBounds(southWest, northEast)
    };
  }


  setOverlayLayerZoom(overlayName, map) {
    map.setZoom(14);
  }

  getChoroplethGeoJson(overlayName, map) {
    //console.log(overlayName);
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
    else if (overlayName === 'How is the BIZ Funded?') {
      this.addOrdinalPolygonLayer(mapConfig.ASSESSMENT_PARCEL_DATA_FILE, mapConfig.assessmentToolTip, map);
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

  toggleSmallMap() {
    console.log("toggle");
    this.setState({smallmap: !this.state.smallmap});
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
        weight: 1,
        fillOpacity: 0.6
      },
      overlayMaps: {},
      overlay: {},
      onEachFeature: toolTip
    }).addTo(map);
    this.toggleLoader();
  }

  addOrdinalPolygonLayer(geoJson, toolTip, map) {
    this.removeAllLayers();
    L.geoJSON(geoJson, {
      style: function(feature) {
        return {
          fillColor: setOrdinalColor(feature.properties.assessable_BIZAsmt),
          color: "#fff",
          weight: 0.2,
          fillOpacity: 0.9
        }
      },
      onEachFeature: toolTip
    }).addTo(map);  
    this.toggleLoader();
    this.props.setActiveOverlay(this.map.selectedOverlayLayerName());
    function setOrdinalColor(d) {
      if (d) {
          return  d == 150000  ? '#0B103F' :
                  d > 50000    ? '#2A316C' :
                  d > 10000    ? '#5C6298' :
                  d > 1000     ? '#B2B5D3' :
                  '#F27B1F';
      } else {
          return "#888";
      }
    }
  }




  componentDidMount() {
    let center;
    if (this.state.chapter.id !== 3) {
      center = [this.state.lat, this.state.lng];
    } else {
      const lng = this.state.lng - 0.005;
      center = [this.state.lat, lng];
    }
    this.map = L.map(this.container, {
      center: center,
      zoom: this.state.zoom,
      maxZoom: 18,
      minZoom: 8,
      maxBounds: this.state.bounds,
      scrollWheelZoom: false,

    }, 100);
    L.tileLayer(mapConfig.MAPBOX_URL, {
      id: 'mapbox.light',
      attribution: mapConfig.MAPBOX_ATTRIBUTION,
    }).addTo(this.map);


    this.setOverlayMaps();

    this.addOverlaySelectControl(this.map);
    this.setSubOverlayControl(this.map);
    this.map.on('overlayChange', () => {
      this.toggleLoader();
      console.log("loading new map layer")
      this.props.setActiveOverlay(this.map.selectedOverlayLayerName());
      this.getChoroplethGeoJson(this.map.selectedOverlayLayerName(), this.map);
      this.setOverlayLayerZoom(this.map.selectedOverlayLayerName(), this.map);
      if (this.state.chapter.id === 2 || this.state.chapter.id === 3) {
        this.setSubOverlayControl(this.map);
      }
    });

    this.setState({map: this.map});

    if (this.state.chapter.id === 3) {
      this.toggleSmallMap();
    }


    global.geomap = this.map;


  }

  loadDefaultLayer(overlayName, map) {
    this.toggleLoader();
    this.getChoroplethGeoJson(overlayName, map);
    this.setOverlayLayerZoom(overlayName, map);
  }
  addOverlaySelectControl(map){
    let overlaySelectControl, fullScreenControl;
    if (this.state.chapter.id !== 3) {
      if(this.state.overlaySelectControl !== null) {
        this.state.overlaySelectControl.remove()
      }
      overlaySelectControl = L.control.overlayselect({
        overlays: this.state.overlayMaps
      }).addTo(map);
      if(this.state.fullScreenControl !== null) {
        this.state.fullScreenControl.remove();
      } 
      fullScreenControl =  new L.Control.Fullscreen({position: 'topright'}).addTo(map);//map.addControl(new L.Control.Fullscreen({position: 'topright'}));  
    } else {
      overlaySelectControl = false;
      fullScreenControl = false;
    }
    this.setState({overlaySelectControl, fullScreenControl});
  }
  addSubOverlayControl(map) {
    let options = null;
    //console.log(this.props.activeOverlay);
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
    } else if (this.props.activeOverlay === 'How is the BIZ Funded?') {
      options = {
        overlays: subOverlayMapsStoryThree['parcels'],
        enableSwitcher: false
      }
      //console.log(options);    
    }

    if(this.state.chapter.id === 2 || this.state.chapter.id === 3){
      if (options) {
        const subLayerControl = L.control.suboverlayselect(options).addTo(map);
        this.setState({currentSubLayerControl: subLayerControl})
      } else {
        options = {
          overlays: subOverlayMapsStoryThree['parcels'],
          enableSwitcher: false
        }
        const subLayerControl = L.control.suboverlayselect(options).addTo(map);
        this.setState({currentSubLayerControl: subLayerControl})       
      }
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
    } else if (this.state.chapter.id === 3) {
      this.setState({overlayMaps: overlayMapsStoryThree},  function() {this.updateMapControls()});
    }
  }

  setSubOverlayControl(map) {
    if (this.state.currentSubLayerControl !== null) {
      this.state.currentSubLayerControl.remove();
    }
    if (this.state.chapter.id === 2) {
      this.addSubOverlayControl(map);
      map.on('overlayGroupChange', () => {
        this.setState({selectedSublayer: map.selectedOverlayGroupName(), loading: !this.state.loading});
        this.getAmenitiesGeoJson(map);
        if (map.selectedOverlayLayerName() === 'Live Downtown') {
          this.getResidentialGeoJson(map)
        }

      });
    }
    if (this.state.chapter.id === 3) {
      this.addSubOverlayControl(map);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({chapter: nextProps.chapter}, function(){this.setOverlayMaps()});
  }

  render() {
    let mapWrapperClass = classNames({
      'map-holder': !this.state.smallmap,
      'map-holder-small-map': this.state.smallmap
    });
    let loaderClass = classNames({
      'sweet-loading': true,
      'hidden': !this.state.loading
    });
    return (
      <div className={mapWrapperClass}>
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