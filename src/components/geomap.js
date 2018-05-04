import React, {Component} from 'react';
import mapConfig from '../utils/maps';
import _ from 'lodash';
import L from 'leaflet';
require('leaflet-fullscreen');
require('leaflet-choropleth');
require('../utils/Control.OverlaySelect');

const  southWest = L.latLng(43.2459282765, -82.3634857961),
  northEast = L.latLng(41.9394285862,-84.2834646531);
class GeoMap extends Component {
  state = {
    lat: mapConfig.DETROIT_POSITION.lat,
    lng: mapConfig.DETROIT_POSITION.lng,
    zoom: mapConfig.ZOOM_LEVEL,
    educationAttainmentGeoJson: {},
    rentIncomeMedianGeoJson: {},
    wacGeoJson: {},
    workersDowntownGeoData: {},
    map : {},
    bounds : L.latLngBounds(southWest, northEast)
  };

  render() {
    return (
      <div className={"map-holder"}>
        <div className="map" ref={ref => this.container = ref}/>
      </div>

    )
  }

  setOverlayLayerZoom(overlayName){
    if(overlayName !== 'Education Attainment' ) {
      this.state.map.setZoom(14);
    }else{
      this.state.map.setZoom(12);
    }
  }


  getMapData() {
    const educationAttainmentGeoReq = fetch(mapConfig.EDUCATION_ATTAINMENT_GEO_API).then(function (response) {
      return response.json()
    });
    const educationAttainmentApiReq = fetch(mapConfig.EDUCATION_ATTAINMENT_DATA_API).then(function (response) {
      return response.json()
    });
    const wacGeoReq = fetch(mapConfig.WAC_GEO_API).then(function (response) {
      return response.json()
    });

    const workersDowntownGeoReq = fetch(mapConfig.WORKERS_DOWNTOWN_GEO_API).then(function (response) {
      return response.json()
    });

    const rentIncomeGeoReq = fetch(mapConfig.RENT_INCOME_GEO_API).then(function (response) {
      return response.json()
    });

    const rentIncomeApiReq = fetch(mapConfig.RENT_INCOME_DATA_API).then(function (response) {
      return response.json()
    });

    return Promise.all([educationAttainmentGeoReq, educationAttainmentApiReq, wacGeoReq, workersDowntownGeoReq, rentIncomeApiReq, rentIncomeGeoReq]).then(([educationAttainmentGeoData, educationAttainmentApiData, wacGeoJson,workersDowntownGeoData, rentIncomeApiData, rentIncomeGeoData]) => {
      const educationAttainmentGeoJson = mapConfig.addEducationAttainmentDataToGeoJson(educationAttainmentGeoData, educationAttainmentApiData);
      const rentIncomeMedianGeoJson = mapConfig.addRentIncomeDataToGeoJson(rentIncomeGeoData, rentIncomeApiData);
      this.setState({educationAttainmentGeoJson});
      this.setState({rentIncomeMedianGeoJson});
      this.setState({wacGeoJson});
      this.setState({workersDowntownGeoData});
    })
  }

  addChoroplethLayer(geoJson, valueProperty, toolTip, map) {
    return L.choropleth(geoJson, {
      valueProperty: valueProperty,
      scale: ['white', 'green'], // chroma.js scale - include as many as you like
      steps: 5, // number of breaks or steps in range
      mode: 'q', // q for quantile, e for equidistant, k for k-means
      style: {
        color: '#fff', // border color
        weight: 2,
        fillOpacity: 0.8
      },
      overlayMaps: {},
      overlay: {},
      onEachFeature: toolTip
    });
  }

  educationAttainmentValProperty(feature) {
    return feature.properties.bachelors_population / parseFloat(feature.properties.total_population) * 100
  }

  educationAttainmentToolTip(feature, layer) {
    layer.bindTooltip(() => {
      let percentage = feature.properties.bachelors_population / parseFloat(feature.properties.total_population) * 100;
      return `Workers with Bachelor's Degeree: ${_.floor(percentage, 2)}%`
    });
  }

  wacValProperty(feature) {
    return feature.properties.CD04 / parseFloat(feature.properties.C000) * 100
  }

  wacToolTip(feature, layer) {
    layer.bindTooltip(() => {
      let percentage = feature.properties.CD04 / parseFloat(feature.properties.C000) * 100;
      return `Workers with Bachelor's Degeree: ${_.floor(percentage, 2)}%`
    });
  }

  workersDowntownProperty(feature) {
    return feature.properties.C000
  }

  workersDowntownToolTip(feature, layer) {
    layer.bindTooltip(() => {
      return `Total workers downtown: ${feature.properties.C000}`
    });
  }

  rentIncomeProperty(feature) {
    return feature.properties.rent_income_ratio
  }

  rentIncomeToolTip(feature, layer) {
    layer.bindTooltip(() => {
      return `Percentage ratio of rent to median household income: ${_.floor(feature.properties.rent_income_ratio, 2)}%`
    });
  }

  componentDidMount() {
    const streets = L.tileLayer(mapConfig.MAPBOX_URL, {
      id: 'mapbox.streets',
      attribution: mapConfig.MAPBOX_ATTRIBUTION,
    });
    this.getMapData().then(() => {
      setTimeout(() => {
        this.map = L.map(this.container, {
          center: [this.state.lat, this.state.lng],
          zoom: this.state.zoom,
          maxZoom: 18,
          minZoom: 8,
          layers: [streets],
          maxBounds: this.state.bounds,

        }, 100);

        const educationAttainmentLayer = this.addChoroplethLayer(this.state.educationAttainmentGeoJson, this.educationAttainmentValProperty, this.educationAttainmentToolTip, this.map);
        const rentIncomeMedianLayer = this.addChoroplethLayer(this.state.rentIncomeMedianGeoJson, this.rentIncomeProperty, this.rentIncomeToolTip, this.map);

        const wacLayer = this.addChoroplethLayer(this.state.wacGeoJson, this.wacValProperty, this.wacToolTip, this.map);
        const workerDowntownLayer = this.addChoroplethLayer(this.state.workersDowntownGeoData, this.workersDowntownProperty, this.workersDowntownToolTip, this.map);
        const  overlayMaps = {
          "Education Attainment": educationAttainmentLayer,
          "Worker - Bachelor's": wacLayer,
          "Worker - Downtown": workerDowntownLayer,
          "Affordability": rentIncomeMedianLayer,
        };
        this.setState({overlayMaps});
        this.setState({map: this.map});
        this.map.on('overlayChange', () => {
          this.setOverlayLayerZoom(this.map.selectedOverlayLayerName());
        });
        L.control.overlayselect({
          overlays: overlayMaps
        }).addTo(this.map);
        this.map.addControl(new L.Control.Fullscreen({position: 'topright'}));

      })
    }).catch((err) => {
      console.log(err);
    });

  }

  componentWillUnmount() {
    this.state.map.remove()
  }

}


export default GeoMap;