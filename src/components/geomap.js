import React, {Component} from 'react';
import mapConfig from '../utils/maps';
import _ from 'lodash';
import classNames from 'classnames';
import {PulseLoader} from  'react-spinners';
import L from 'leaflet';
import {
  getEducationAttainmentGeoJson,
  getWACGeoJson,
  getDowtownWorkersGeoJson, getDiversityIndexGeoJson, getRentIncomeGeoJson, getCrimeGeoJson, getAmenitiesServicesGeoJsonLayers,getAmenitiesInfrasctructureGeoJsonLayers
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
      "restaurants": "#EF4060",
      "retailers": "#00A992",
      "parks": "#F27B21"
    },
    "infrastructure": {
      "parking garages": "#F27B81",
      "lighthouses": "#0039B1",
      "MoGo stations": "#F47F51"
    }
  },
};
class GeoMap extends Component {

  constructor(props){
    super(props);
    console.log(props.chapter, "PROPS")
    this.state = {
      loading: false,
      chapter: props.chapter,
      lat: mapConfig.DETROIT_POSITION.lat,
      lng: mapConfig.DETROIT_POSITION.lng,
      zoom: mapConfig.ZOOM_LEVEL,
      educationAttainmentGeoJson: {},
      rentIncomeMedianGeoJson: {},
      wacGeoJson: {},
      workersDowntownGeoData: {},
      diversityIndexGeoJson: {},
      geoJson: {},
      crimeGeoJson: {},
      selectedSublayer: '',
      map: {},
      overlayMaps: props.chapter.id === 1 ? overlayMapsStoryOne : overlayMapsStoryTwo,
      bounds: L.latLngBounds(southWest, northEast)
    };
  }



  setOverlayLayerZoom(overlayName) {
    if (overlayName !== 'Education Attainment') {
      this.state.map.setZoom(14);
    } else {
      this.state.map.setZoom(12);
    }
  }

  getChoroplethGeoJson(overlayName) {
    if (overlayName === 'Education Attainment') {
      getEducationAttainmentGeoJson().then((data) => {
        this.addChoroplethLayer(data, mapConfig.educationAttainmentValProperty, mapConfig.educationAttainmentToolTip);
      });
    } else if (overlayName === "Worker - Bachelor's") {
      getWACGeoJson().then((data) => {
        this.addChoroplethLayer(data, mapConfig.wacValProperty, mapConfig.wacToolTip);
      });
    } else if (overlayName === "Worker - Downtown") {
      getDowtownWorkersGeoJson().then((data) => {
        this.addChoroplethLayer(data, mapConfig.workersDowntownProperty, mapConfig.workersDowntownToolTip);
      });
    } else if (overlayName === "Diversity Index") {
      getDiversityIndexGeoJson().then((data) => {
        this.addChoroplethLayer(data, mapConfig.diversityIndexProperty, mapConfig.diversityIndexToolTip);
      });
    } else if (overlayName === 'Affordability') {
      getRentIncomeGeoJson().then((data) => {
        this.addChoroplethLayer(data, mapConfig.rentIncomeProperty, mapConfig.rentIncomeToolTip);
      });
    } else if (overlayName === 'Crime') {
      getCrimeGeoJson().then((data) => {
        this.addChoroplethLayer(data, mapConfig.crimeIndexProperty, mapConfig.crimeIndexToolTip);
      });
    }else if (overlayName === 'Amenities') {
        this.getAmenitiesGeoJson();
    }
  }

  getAmenitiesGeoJson() {
      const subOverlay = subOverlayMapsStoryTwo['Amenities'];
      if(this.state.selectedSublayer === 'services'){
        getAmenitiesServicesGeoJsonLayers().then(resp => {
          this.removeAllLayers();
          _.forEach((resp), (val, key) => {
            if(key === 'restaurants') {
              this.addGeoJsonLayer(val, mapConfig.restaurantsToolTip, subOverlay[this.state.selectedSublayer][key]);
            }else if(key === 'retailers'){
              this.addGeoJsonLayer(val, mapConfig.retailToolTip, subOverlay[this.state.selectedSublayer][key]);
            }
            else if(key === 'parks'){
              this.addGeoJsonLayer(val, mapConfig.parksToolTip , subOverlay[this.state.selectedSublayer][key]);
            }
          });
          this.toggleLoader();
        });
      }else if(this.state.selectedSublayer === 'infrastructure') {
        getAmenitiesInfrasctructureGeoJsonLayers().then(resp => {
          this.removeAllLayers();
          _.forEach((resp), (val, key) => {
            if(key === 'parking garages') {
              this.addGeoJsonLayer(val, mapConfig.parkingGarageToolTip, subOverlay[this.state.selectedSublayer][key]);
            }else if(key === 'lighthouses'){
              this.addGeoJsonLayer(val, mapConfig.lighthousesToolTip, subOverlay[this.state.selectedSublayer][key]);
            }
            else if(key === 'MoGo stations'){
              this.addGeoJsonLayer(val, mapConfig.mogoToolTip , subOverlay[this.state.selectedSublayer][key]);
            }
          });
          this.toggleLoader();
        });
      }
  }

  toggleLoader() {
    this.setState({loading: !this.state.loading});
  }

  removeAllLayers() {
    this.state.map.eachLayer(function(layer){
      if(layer.options['id'] !== 'mapbox.streets'){
        layer.remove();
      }

    });
  }
  addGeoJsonLayer(data, tooltip, fillColor) {
    var geojsonMarkerOptions = {
      radius: 6,
      fillColor: fillColor,
      color: "#000",
      weight: 1,
      opacity: 1,
      border: 'none',
      fillOpacity: 1
    };
    L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
      },
      onEachFeature: tooltip
    }).addTo(this.state.map);

  }
  addChoroplethLayer(geoJson, valueProperty, toolTip) {
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
    }).addTo(this.state.map);
    this.toggleLoader();
  }


  componentDidMount() {
    this.map = L.map(this.container, {
      center: [this.state.lat, this.state.lng],
      zoom: this.state.zoom,
      maxZoom: 18,
      minZoom: 8,
      // layers: [streets],
      maxBounds: this.state.bounds,

    }, 100);
    L.tileLayer(mapConfig.MAPBOX_URL, {
      id: 'mapbox.streets',
      attribution: mapConfig.MAPBOX_ATTRIBUTION,
    }).addTo(this.map);
    if (this.state.chapter.id === 1){
      this.setState({overlayMaps: overlayMapsStoryOne})
    }else if(this.state.chapter.id === 2){
      console.log("Chapter two")
      this.setState({overlayMaps: overlayMapsStoryTwo});
      this.setState({selectedSublayer: 'services'});


    }

    L.control.overlayselect({
      overlays: this.state.overlayMaps
    }).addTo(this.map);
    this.map.addControl(new L.Control.Fullscreen({position: 'topright'}));
    if(this.state.chapter.id === 2) {
      L.control.suboverlayselect({
        overlays: subOverlayMapsStoryTwo['Amenities'],
        selected: "services"
      }).addTo(this.map);
      this.map.zoomControl.setPosition('topright');
      this.map.on('overlayGroupChange', () => {
        this.toggleLoader();
        this.setState({selectedSublayer: this.map.selectedOverlayGroupName()});
        this.getAmenitiesGeoJson();
      });
    }
    this.map.on('overlayChange', () => {
      this.toggleLoader();
      this.getChoroplethGeoJson(this.map.selectedOverlayLayerName());
      this.setOverlayLayerZoom(this.map.selectedOverlayLayerName());
    });

    this.setState({map: this.map});


  }

  componentWillUnmount() {
    this.state.map.remove()
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


export default GeoMap;