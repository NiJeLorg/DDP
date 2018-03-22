import React, { Component } from 'react';
import {Map, TileLayer, Marker, Popup, ZoomControl} from 'react-leaflet';

class GeoMap extends Component {

    state = {
        lat: 42.331427,
        lng: -83.045754,
        zoom: 13,
    };

    render() {
        const position = [this.state.lat, this.state.lng]
        return (
            <Map center={position} zoom={this.state.zoom} className={'story-map'} zoomControl={false}>
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
            <span>
              A pretty CSS3 popup. <br/> Easily customizable.
            </span>
                    </Popup>
                </Marker>
                <ZoomControl position="topright" />
            </Map>
        )
    }
}

export default GeoMap;