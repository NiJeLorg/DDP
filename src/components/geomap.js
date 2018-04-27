import React, {Component} from 'react';
import L from 'leaflet';
import mapConfig from '../utils/maps';
import _ from 'lodash';
require('leaflet-choropleth');


class GeoMap extends Component {
  state = {
    lat: mapConfig.DETROIT_POSITION.lat,
    lng: mapConfig.DETROIT_POSITION.lng,
    zoom: mapConfig.ZOOM_LEVEL,
    educationAttainmentGeoJson: {},
    wacGeoJson: {},
    workersDowntownGeoData: {},
    map: {}
  };

  render() {
    return (<div className="map" ref={ref => this.container = ref}/>)
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

    return Promise.all([educationAttainmentGeoReq, educationAttainmentApiReq, wacGeoReq, workersDowntownGeoReq]).then(([educationAttainmentGeoData, educationAttainmentApiData, wacGeoJson,workersDowntownGeoData]) => {
      const educationAttainmentGeoJson = mapConfig.addEducationAttainmentDataToGeoJson(educationAttainmentGeoData, educationAttainmentApiData);
      this.setState({educationAttainmentGeoJson});
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
      onEachFeature: toolTip
    }).addTo(map);
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
          fullscreenControl: true,
          maxZoom: 18,
          layers: [streets]
        }, 100);

        const educationAttainmentLayer = this.addChoroplethLayer(this.state.educationAttainmentGeoJson, this.educationAttainmentValProperty, this.educationAttainmentToolTip, this.map);

        const wacLayer = this.addChoroplethLayer(this.state.wacGeoJson, this.wacValProperty, this.wacToolTip, this.map);
        const workerDowntownLayer = this.addChoroplethLayer(this.state.workersDowntownGeoData, this.workersDowntownProperty, this.workersDowntownToolTip, this.map);
        let overlayMaps = {
          "Education Attainment": educationAttainmentLayer,
          "Worker - Bachelor's": wacLayer,
          "Worker - Downtown": workerDowntownLayer,
        };
        L.control.layers('', overlayMaps).addTo(this.map);
        this.setState({map: this.map});
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