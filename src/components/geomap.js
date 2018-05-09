import React, {Component} from 'react';
import mapConfig from '../utils/maps';
import _ from 'lodash';
import L from 'leaflet';
import {
  getEducationAttainmentGeoJson,
  getWACGeoJson,
  getDowtownWorkersGeoJson, getDiversityIndexGeoJson, getRentIncomeGeoJson, getCrimeGeoJson
} from '../services/api';

require('leaflet-fullscreen');
require('leaflet-choropleth');
require('../utils/Control.OverlaySelect');


const southWest = L.latLng(43.2459282765, -82.3634857961),
  northEast = L.latLng(41.9394285862, -84.2834646531);
const overlayMaps = {
  "Education Attainment": " Education Attainment",
  "Worker - Bachelor's": "Worker - Bachelor's",
  "Worker - Downtown": "Worker - Downtown",
  "Diversity Index": "Diversity Index",
  "Affordability": "Affordability",
  "Crime": "Crime",
};

class GeoMap extends Component {
  state = {
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
    map: {},
    bounds: L.latLngBounds(southWest, northEast)
  };

  render() {
    return (
      <div className={"map-holder"}>
        <div className="map" ref={ref => this.container = ref}/>
      </div>

    )
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
        console.log("Setting map")
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
    }
  }

  addChoroplethLayer(geoJson, valueProperty, toolTip) {
    this.state.map.eachLayer(function(layer){
      if(layer.options['id'] !== 'mapbox.streets'){
        layer.remove();
      }

    });
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
    L.control.overlayselect({
      overlays: overlayMaps
    }).addTo(this.map);
    this.map.addControl(new L.Control.Fullscreen({position: 'topright'}));

    this.map.on('overlayChange', () => {
      this.getChoroplethGeoJson(this.map.selectedOverlayLayerName());
      this.setOverlayLayerZoom(this.map.selectedOverlayLayerName());
    });

    this.setState({overlayMaps});
    this.setState({map: this.map});


  }

  componentWillUnmount() {
    this.state.map.remove()
  }

}


export default GeoMap;