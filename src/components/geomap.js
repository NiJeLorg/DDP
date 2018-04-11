import React, {Component} from 'react';
class GeoMap extends Component {
    state = {
        lat: 42.331427,
        lng: -83.045754,
        zoom: 13,
    };

    render() {
        return (
                <div className="map"
                     ref={ ref => this.container = ref } />

        )
    }

    componentDidMount() {
        setTimeout(() => {
            this.map = L.map(this.container, {
                center: [40, 30],
                zoom: 5,
                maxZoom: 18,
                layers: new L.TileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png')
            }, 100)
        })
    }

    componentWillUnmount() {
        this.map.remove()
    }
}


export default GeoMap;