import React, {Component} from 'react';
import L from 'leaflet';
class GeoMap extends Component {
    state = {
        lat: 42.334165,
        lng: -83.048754,
        zoom: 13,
    };

    render() {
        return (
                <div className="map"
                     ref={ ref => this.container = ref } />

        )
    }

    componentDidMount() {
        const accessToken = 'pk.eyJ1Ijoia2FzaGJvc3MiLCJhIjoiY2pjYnZiOXNyMG1iMjMzbzJlaTQ3dGFqbyJ9.Fe3wRj0zktbL6zxsTNk2DQ';
        const mapboxUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
        const mapboxAttribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';
        const streets  = L.tileLayer(mapboxUrl, {id: 'mapbox.streets', attribution: mapboxAttribution, accessToken:accessToken}),
            outdoors   = L.tileLayer(mapboxUrl, {id: 'mapbox.outdoors', attribution: mapboxAttribution, accessToken:accessToken});
        const baseMaps = {
            "Outdoors": outdoors,
            "Streets": streets
        };
        setTimeout(() => {
            this.map = L.map(this.container, {
                center: [this.state.lat, this.state.lng],
                zoom: this.state.zoom,
                fullscreenControl: true,
                maxZoom: 18,
                layers: [streets, outdoors]
            }, 100);

            L.control.layers(baseMaps).addTo(this.map);
            // this.map.addControl(new L.Control.fullscreen());

        });


    }

    componentWillUnmount() {
        this.map.remove()
    }
}


export default GeoMap;