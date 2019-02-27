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
  getResidentialBuildingGeoJson,
  getBIZAreaGeoJson,
  getLandscapeAreasGeoJson
} from '../services/api';

require('leaflet-fullscreen');
require('leaflet-choropleth');
require('../utils/Control.OverlaySelect');
require('../utils/Control.SubOverlaySelect');


const southWest = L.latLng(43.2459282765, -82.3634857961),
  northEast = L.latLng(41.9394285862, -84.2834646531);
const overlayMapsStoryOne = {
  "Educational Attainment": "Educational Attainment",
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
        color: "#88c659"
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
      label: "Business Contact",
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
    "Pedestrian Assistance": {
      label: "Pedestrian Assist",
      color: "#E0E060"
    },
    "Trash (lbs)": {
      label: "Trash Pickup",
      color: "#00A992"
    },
    "Parks Maintained": {
      label: "Parks Maintained",
      color: "#88c659"
    },
  },
  "Live Downtown": {'2018': {}, '2019': {}, '2020': {}, '2021': {}, '2022': {}}
};

const overlayMapsStoryThree = {
  "How is the BIZ Funded?": "How is the BIZ Funded?"
};

const overlayMapsLandscaping = {
  "Landscaping": "Landscaping"
};

const subOverlayMapsStoryThree = {
  "parcels": {
    "$1-$1K": {
      label: "$1-$1K",
      color: "#F27B1F"
    },
    "$1K-$10K": {
      label: "$1K-$10K",
      color: "#B2B5D3"
    },
    "$10K-$50K": {
      label: "$10K-$50K",
      color: "#5C6298"
    },
    "$50K-$150K": {
      label: "$50K-$150K",
      color: "#2A316C"
    },
    "$150K": {
      label: "$150K",
      color: "#010314"
    },
    "Exempt from Assessment": {
      label: "Exempt<br />from Assessment",
      color: "#888"
    },
  }
};

const subOverlayMapsLandscaping = {
  "layers": {
    "BIZ Landscape Maintenance Areas": {
      label: "BIZ Landscape Maintenance Areas",
      color: "#98e600"
    },
    "BIZ Area": {
      label: "BIZ Area",
      color: "#e6e6e6"
    },
  }
};

class GeoMap extends Component {

  constructor(props) {
    let overlayMaps;
    let overlayLayers = {};
    if (props.chapter.id === 1) {
      overlayMaps = overlayMapsStoryOne;
    } else if (props.chapter.id === 2) {
      overlayMaps = overlayMapsStoryTwo;
    } else if (props.chapter.id === 3 && props.landscaping) {
      //console.log("props landscaping");
      overlayMaps = overlayMapsLandscaping;
    } else if (props.chapter.id === 3) {
      //console.log("props BIZ");
      overlayMaps = overlayMapsStoryThree;
    }
    super(props);
    this.state = {
      loading: false,
      chapter: props.chapter,
      landscaping: props.landscaping,
      lat: mapConfig.DETROIT_POSITION.lat,
      lng: mapConfig.DETROIT_POSITION.lng,
      overlaySelectControl: null,
      fullScreenControl: null,
      zoom: mapConfig.ZOOM_LEVEL,
      educationAttainmentGeoJson: null,
      rentIncomeMedianGeoJson: null,
      wacGeoJson: null,
      workersDowntownGeoJson: null,
      diversityIndexGeoJson: null,
      geoJson: {},
      crimeGeoJson: null,
      selectedSublayer: '',
      currentSubLayerControl: null,
      map: {},
      overlayMaps: overlayMaps,
      overlayLayers: overlayLayers,
      choroplethLayer: null,
      bounds: L.latLngBounds(southWest, northEast)
    };
  }


  setOverlayLayerZoom(overlayName, map) {
    map.setZoom(14);
  }


  getChoroplethGeoJson(overlayName, map, addToMap) {
    if (overlayName === 'Educational Attainment') {
      const title = "Percentage of Residents<br />With a Bachelor's<br />Degree";
      const suffix = "%";
      if (!this.state.educationAttainmentGeoJson) {
        getEducationAttainmentGeoJson().then((data) => {
          this.setState({educationAttainmentGeoJson: data});
          if (addToMap) {
            this.addChoroplethLayer(this.state.educationAttainmentGeoJson, mapConfig.educationAttainmentValProperty, mapConfig.educationAttainmentToolTip, map, title, suffix); 
          }   
        });        
      } else {
        if (addToMap) {
          this.addChoroplethLayer(this.state.educationAttainmentGeoJson, mapConfig.educationAttainmentValProperty, mapConfig.educationAttainmentToolTip, map, title, suffix);
        }
      }
    } else if (overlayName === "Worker - Bachelor's") {
      const title = "Percentage of Workers<br />With a Bachelor's<br />Degree"
      const suffix = "%";
      if (!this.state.wacGeoJson) {
        getWACGeoJson().then((data) => {
          this.setState({wacGeoJson: data});
          if (addToMap) {
            this.addChoroplethLayer(this.state.wacGeoJson, mapConfig.wacValProperty, mapConfig.wacToolTip, map, title, suffix);
          }
        });
      } else {
        if (addToMap) {
          this.addChoroplethLayer(this.state.wacGeoJson, mapConfig.wacValProperty, mapConfig.wacToolTip, map, title, suffix);
        }
      }
    } else if (overlayName === "Worker - Downtown") {
      const title = "Number of Downtown<br />Workers";
      const suffix = "";
      if (!this.state.workersDowntownGeoJson) {
        getDowtownWorkersGeoJson().then((data) => {
          this.setState({workersDowntownGeoJson: data});
          if (addToMap) {
            this.addChoroplethLayer(this.state.workersDowntownGeoJson, mapConfig.workersDowntownProperty, mapConfig.workersDowntownToolTip, map, title, suffix);
          }
        });
      } else {
        if (addToMap) {
          this.addChoroplethLayer(this.state.workersDowntownGeoJson, mapConfig.workersDowntownProperty, mapConfig.workersDowntownToolTip, map, title, suffix);
        }
      }
    } else if (overlayName === "Diversity Index") {
      const title = "Diversity Index (0 to 1 Scale;<br />Higher Numbers Represent<br /> More Racial Diversity)"
      const suffix = "";
      if (!this.state.diversityIndexGeoJson) {
        getDiversityIndexGeoJson().then((data) => {
          this.setState({diversityIndexGeoJson: data});
          if (addToMap) {
            this.addChoroplethLayer(this.state.diversityIndexGeoJson, mapConfig.diversityIndexProperty, mapConfig.diversityIndexToolTip, map, title, suffix);
          }
        });
      } else {
        if (addToMap) {
          this.addChoroplethLayer(this.state.diversityIndexGeoJson, mapConfig.diversityIndexProperty, mapConfig.diversityIndexToolTip, map, title, suffix);
        }
      }
    } else if (overlayName === 'Affordability') {
      const title = "Percentage Ratio of<br />Rent to Median<br />Household Income"
      const suffix = "%";
      if (!this.state.rentIncomeMedianGeoJson) {
        getRentIncomeGeoJson().then((data) => {
          this.setState({rentIncomeMedianGeoJson: data});
          if (addToMap) {
            this.addChoroplethLayer(this.state.rentIncomeMedianGeoJson, mapConfig.rentIncomeProperty, mapConfig.rentIncomeToolTip, map, title, suffix);
          }
        });
      } else {
        if (addToMap) {
          this.addChoroplethLayer(this.state.rentIncomeMedianGeoJson, mapConfig.rentIncomeProperty, mapConfig.rentIncomeToolTip, map, title, suffix);
        }
      }
    } else if (overlayName === 'Crime') {
      const title = "Number of Crimes"
      const suffix = "";
      if (!this.state.crimeGeoJson) {
        getCrimeGeoJson().then((data) => {
          this.setState({crimeGeoJson: data});
          if (addToMap) {
            this.addChoroplethLayer(this.state.crimeGeoJson, mapConfig.crimeIndexProperty, mapConfig.crimeIndexToolTip, map, title, suffix);
          }
        });
      } else {
        if (addToMap) {
          this.addChoroplethLayer(this.state.crimeGeoJson, mapConfig.crimeIndexProperty, mapConfig.crimeIndexToolTip, map, title, suffix);
        }
      }
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
      if (this.props.landscaping){
        getBIZAreaGeoJson().then((data) => {
          this.addPolygonLayer(data, null, map);
          getLandscapeAreasGeoJson().then((data) => {
            this.addPolygonLayer(data, null, map);
          });
        });
      } else {
        this.addOrdinalPolygonLayer(mapConfig.ASSESSMENT_PARCEL_DATA_FILE, mapConfig.assessmentToolTip, map);  
      }
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
            this.addGeoJsonPolygonLayer(val, mapConfig.landscapingToolTip, "#88c659", map);
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
            this.addGeoJsonPolygonLayer(val, mapConfig.parksToolTip, subOverlay[this.state.selectedSublayer][key]['color'], map);
          }
        });
        this.toggleLoader();
      });
    } else if (this.state.selectedSublayer === 'infrastructure') {
      getAmenitiesInfrasctructureGeoJsonLayers().then(resp => {
        this.removeAllLayers();
        _.forEach((resp), (val, key) => {
          if (key === 'parking garages') {
            this.addGeoJsonPolygonLayer(val, mapConfig.parkingGarageToolTip, subOverlay[this.state.selectedSublayer][key]['color'], map);
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
    this.setState({smallmap: !this.state.smallmap});
  }

  toggleLandscapingMap() {
    this.setState({landscapingmap: !this.state.landscapingmap});
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
      radius: 4,
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

  addGeoJsonPolygonLayer(data, tooltip, fillColor, map) {
    var geojsonPolygonOptions = {
      color: "#000",
      weight: 0,
      opacity: 1,
      fillColor: fillColor,
      fillOpacity: 0.8,
    };
    L.geoJSON(data, {
      style: geojsonPolygonOptions,
      onEachFeature: tooltip
    }).addTo(map);

  } 

  addChoroplethLayer(geoJson, valueProperty, toolTip, map, overlayName, suffix) {
    this.removeAllLayers();
    let choroplethLayer = L.choropleth(geoJson, {
      valueProperty: valueProperty,
      scale: ['#edf8e9', '#bae4b3', '#74c476', '#31a354', '#006d2c'], // chroma.js scale - include as many as you like
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

    this.addChoroplethLegend(map, choroplethLayer, overlayName, suffix);
    
    this.setState({loading: false});
  }

  addChoroplethLegend(map, choroplethLayer, overlayName, suffix) {
    if (document.getElementsByClassName('leaflet-control-sub-layer-select').length) {
      let elements = document.getElementsByClassName('leaflet-control-sub-layer-select');
      for (let i = 0; i < elements.length; i++) {
        elements[i].remove();  
      }
    }

    const legend = L.control({ position: 'topleft' })
    legend.onAdd = function (map) {
      const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control-sub-layer-select leaflet-control');
      const sub_overlay_div = L.DomUtil.create('div', 'sub-overlay ', div);
      L.DomUtil.create('div', 'overlay-switcher', sub_overlay_div);
      const sub_overlay_title = L.DomUtil.create('div', 'sub-overlay-menu-title', sub_overlay_div);
      sub_overlay_title.innerHTML = overlayName;
      var limits = choroplethLayer.options.limits;
      var colors = choroplethLayer.options.colors;
      var labels = [];
  
      // specifics for each layer
      let fixed = 1;
      if (overlayName === "Number of Downtown<br />Workers" || overlayName === "Number of Crimes") {
        fixed = 0;
      }

      let lower, upper;
      limits.forEach(function (limit, index) {
        if (limits[index - 1] || limits[index - 1] === 0) {
          lower = (limits[index - 1] + 0.1).toFixed(fixed) + ' - ';
        } else {
          lower = '';
        }
        upper = limit.toFixed(fixed) + suffix;
        labels.push('<li><span class="dot" style="background-color: ' + colors[index] + '"></span>' + lower + upper + '</li>')
      });
  
      sub_overlay_div.innerHTML += '<ul class="sub-overlay-menu">' + labels.join('') + '</ul>';
      return div;
    }
    legend.addTo(map);
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
          return  d == 150000  ? '#010314' :
                  d > 50000    ? '#2A316C' :
                  d > 10000    ? '#5C6298' :
                  d > 1000     ? '#B2B5D3' :
                  '#F27B1F';
      } else {
          return "#888";
      }
    }
  }

  addPolygonLayer(geoJson, toolTip, map) {
    let fillColor = "#e6e6e6";
    let color = "#333";
    let weight = 2;
    let fillOpacity = 0.3;
    L.geoJSON(geoJson, {
      style: function(feature) {
        if (feature.properties.LndscpNum) {
          fillColor = "#98e600";
          color = "#fff";
          weight = 0.2;
          fillOpacity = 0.9;
        }
        return {
          fillColor: fillColor,
          color: color,
          weight: weight,
          fillOpacity: fillOpacity
        }
      },
      //onEachFeature: toolTip
    }).addTo(map);  
    this.toggleLoader();
    this.props.setActiveOverlay(this.map.selectedOverlayLayerName());
  }



  componentDidMount() {
    let center, zoom;
    if (this.state.chapter.id !== 3) {
      center = [this.state.lat, this.state.lng];
    } else {
      const lng = this.state.lng - 0.005;
      center = [this.state.lat, lng];
    }
    if (this.props.landscaping) {
      zoom = 16;
    } else {
      zoom = this.state.zoom
    }
    this.map = L.map(this.container, {
      center: center,
      zoom: zoom,
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
      this.getChoroplethGeoJson(this.map.selectedOverlayLayerName(), this.map, true);
      this.setOverlayLayerZoom(this.map.selectedOverlayLayerName(), this.map);
      if (this.state.chapter.id === 2 || this.state.chapter.id === 3) {
        this.setSubOverlayControl(this.map);
      }
    });

    this.setState({map: this.map});

    if (this.state.chapter.id === 3 && this.props.landscaping) {
      this.toggleLandscapingMap();
    } else if (this.state.chapter.id === 3) {
      this.toggleSmallMap();
    }

    if (this.props.landscaping) {
      global.landscapingmap = this.map;
    } else {
      global.geomap = this.map;
    }
    


  }

  loadDefaultLayer(overlayName, map) {
    console.log("load default layer: ", overlayName);
    this.toggleLoader();
    this.getChoroplethGeoJson(overlayName, map, true);
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
        selected: "services",
        title: "",
      }
    } else if (this.props.activeOverlay === 'Clean and Welcoming') {
      options = {
        overlays: subOverlayMapsStoryTwo['Clean and Welcoming'],
        enableSwitcher: false,
        title: "Clean and Welcoming",
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
        enableSwitcher: false,
        position: 'bottomleft',
        title: 'BIZ Assessment',
      }
    } else if (this.props.activeOverlay === 'Landscaping') {
      options = {
        overlays: subOverlayMapsLandscaping['layers'],
        enableSwitcher: false,
        position: 'bottomleft',
        title: 'Landscape Maintainance Areas',
      }
    }

    if(this.state.chapter.id === 2 || this.state.chapter.id === 3){
      //console.log(options);    
      if (options) {
        const subLayerControl = L.control.suboverlayselect(options).addTo(map);
        this.setState({currentSubLayerControl: subLayerControl})
      } else if (this.props.landscaping) {
        options = {
          overlays: subOverlayMapsLandscaping['layers'],
          enableSwitcher: false,
          position: 'bottomleft',
          title: 'Landscape Maintainance Areas',
        } 
        const subLayerControl = L.control.suboverlayselect(options).addTo(map);
        this.setState({currentSubLayerControl: subLayerControl})         
      } else {
        options = {
          overlays: subOverlayMapsStoryThree['parcels'],
          enableSwitcher: false,
          position: 'bottomleft',
          title: 'BIZ Assessment',
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
    //console.log(this.state.overlayMaps);
    // if (this.state.chapter.id === 1) {
    //   _.forEach(this.state.overlayMaps, (val, key) => {
    //     this.getChoroplethGeoJson(val, this.state.map, false);
    //   });
    // }    
    this.addOverlaySelectControl(this.state.map);
    this.setSubOverlayControl(this.state.map);
    this.loadDefaultLayer(this.props.activeOverlay, this.map);
  }

  setOverlayMaps() {
    if (this.state.chapter.id === 1) {
      this.setState({overlayMaps: overlayMapsStoryOne},  function() {this.updateMapControls()});
    } else if (this.state.chapter.id === 2) {
      if (document.getElementsByClassName('leaflet-control-sub-layer-select').length) {
        let elements = document.getElementsByClassName('leaflet-control-sub-layer-select');
        for (let i = 0; i < elements.length; i++) {
          elements[i].remove();  
        }
      }      
      this.setState({
        overlayMaps: overlayMapsStoryTwo,
        selectedSublayer: 'services'},  function() {this.updateMapControls()});
    } else if (this.state.chapter.id === 3 && this.state.landscaping) {
      this.setState({overlayMaps: overlayMapsLandscaping},  function() {this.updateMapControls()});
      //console.log(this.state.overlayMaps);
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
        this.setState({selectedSublayer: map.selectedOverlayGroupName()});
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
      'map-holder-small-map': this.state.smallmap,
      'map-holder-landscaping-map': this.state.landscapingmap
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