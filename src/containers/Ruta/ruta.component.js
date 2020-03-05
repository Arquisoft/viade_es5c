import React, {Component} from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '75%'
};

export class Ruta extends Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={{
                    lat: 43.354856,
                    lng: -5.851450
                }}
            >
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAvIiRezGEiWzjKcmje9tzq56ePzFC5hVI'
})(Ruta);