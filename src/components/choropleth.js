import Choropleth from 'react-leaflet-choropleth'
import { Map } from 'react-leaflet'

const style = {
  fillColor: '#F28F3B', //default color filll
  weight: 2, //normal styling
  opacity: 1,
  color: 'white',
  dashArray: '3',
  fillOpacity: 0.5
}

const map = (geojson, property) => (
  <Map>
    <Choropleth
      data={{type: 'FeatureCollection', features: geojson}  /*feature collection or array*/}
      valueProperty={(feature) => feature.properties[property]  /*value for choropleth*/}
      // visible={(feature) => feature.id !== active.id        /*use choropleth color?*/}
      scale={['#b3cde0', '#011f4b']                         /*color range*/}
      steps={7                                              /*how many different colors to use?*/}
      mode={'e'                                             /*use equadistance mode, others include kmeans and quantile*/}
      style={style}
      onEachFeature={(feature, layer) => layer.bindPopup(feature.properties.label)}
      ref={(el) => this.choropleth = el.leafletElement      /*get the geojson's layer container*/}
    />
  </Map>
)