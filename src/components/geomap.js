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
  };

  render() {
    return (
      <div className="map" ref={ref => this.container = ref}/>
    )
  }

  componentDidMount() {

    const streets = L.tileLayer(mapConfig.MAPBOX_URL, {
        id: 'mapbox.streets',
        attribution: mapConfig.MAPBOX_ATTRIBUTION,
      });

    const geoJson = fetch(mapConfig.EDUCATION_ATTAINMENT_GEO_API).then(function (response) {
      return response.json()
    });
    const apiData = fetch(mapConfig.EDUCATION_ATTAINMENT_DATA_API).then(function (response) {
      return response.json()
    });

    Promise.all([geoJson, apiData]).then(([geoJsonData, apiData]) => {
      setTimeout(() => {
        this.map = L.map(this.container, {
          center: [this.state.lat, this.state.lng],
          zoom: this.state.zoom,
          fullscreenControl: true,
          maxZoom: 18,
          layers: [streets]
        }, 100);
        geoJsonData = mapConfig.addEducationAttainmentDataToGeoJson(geoJsonData, apiData);

        const geoJsonObj = L.choropleth(geoJsonData, {
          valueProperty: (feature) => { return feature.properties.bachelors_population/parseFloat(feature.properties.total_population) * 100}, // which property in the features to use
          scale: ['white', 'green'], // chroma.js scale - include as many as you like
          steps: 5, // number of breaks or steps in range
          mode: 'q', // q for quantile, e for equidistant, k for k-means
          style: {
            color: '#fff', // border color
            weight: 2,
            fillOpacity: 0.8
          },
          onEachFeature: function (feature, layer) {
            layer.bindTooltip(() => {
              const percentage = feature.properties.bachelors_population/parseFloat(feature.properties.total_population) * 100;
              return feature.properties.name + '<br/>' + `Population with Bachelor's Degeree: ${_.floor(percentage, 2)}%`
            });
          }
        }).addTo(this.map);
      })

    }).catch((err) => {
      console.log(err);
    });

  }


  componentWillUnmount() {
    this.map.remove()
  }
}


export default GeoMap;