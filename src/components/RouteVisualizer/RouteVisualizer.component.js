import React, {Component} from 'react';
import {GoogleApiWrapper, Map, Marker, Polyline} from 'google-maps-react';


const mapStyles = {
    width: '99%',
    height: '75%',
};

export class RouteVisualizer extends Component {

    constructor(props) {
        super(props);
        this.ruta = this.props.ruta
        console.log(this.ruta)
        this.pathCoordinates = [];

    }


    render() {
        return (
            <div>
                <h1> {this.ruta.name}</h1>
                <p> {this.ruta.description}</p>
                <Map
                    google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    initialCenter={{
                        lat: this.ruta.points[0].latitud,
                        lng: this.ruta.points[0].longitud
                    }}
                >
                    {this.drawRoute()}
                    {this.addPolyline()}

                </Map>
            </div>);
    }


    drawRoute = () => {
        return this.ruta.points.map((p, index) => {
            return <Marker key={index} id={index} position={{
                lat: p.latitud,
                lng: p.longitud
            }}
                           onClick={() => console.log("You clicked me!")}/>

        })
    }

    addPolyline() {
        for (var i = 0; i < this.ruta.points.length; i++) {
            console.log(i);
            this.pathCoordinates.push({lat: this.ruta.points[i].getLat(), lng: this.ruta.points[i].getLng()});

        }

        return <Polyline strokeColor="#ff8000"
                         strokeOpacity={0.8}
                         strokeWeight={4}
                         path={this.pathCoordinates}>
        </Polyline>
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCOAPsIpth-pvZtOeXXB_9B7iVGi9RFAAE'
    //apiKey: 'AIzaSyAvIiRezGEiWzjKcmje9tzq56ePzFC5hVI'
})(RouteVisualizer);