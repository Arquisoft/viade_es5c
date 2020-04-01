import React, {Component} from 'react';
import {default as update} from "react-addons-update";
import {GoogleApiWrapper, Map, Marker, Polyline} from 'google-maps-react';
import Point from "../../entities/Point"

const containerStyle = {
    display: 'flex',
    padding: '30px 0',
    position: 'relative',
};

const style = {
    display: 'flex',
    flexDirection: 'row',
    height: 'auto',
    width: '100vw'
};

export class CreateMap extends Component {
    sendData = () => {
        this.props.parentCallback(this.state.points);
    };

    state = {
        points: [],
        markers: [],
        center: {
            lat: 40.4165000,
            lng: -3.7025600
        }
    };

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    center: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                })
            });
        }
    }

    _onClick = (event, map, clickEvent) => {
        var {markers} = this.state;
        markers = update(markers, {
            $push: [
                {
                    position: {
                        lat: clickEvent.latLng.lat(),
                        lng: clickEvent.latLng.lng(),
                    },
                    defaultAnimation: 2,
                    key: Date.now(),
                },
            ],
        });
        this.setState({markers});
        var {points} = this.state;
        points = update(points, {
            $push: [
               new Point( clickEvent.latLng.lat()+0, clickEvent.latLng.lng()+0 ,points.length)

            ],
        });
        console.log(points)
        this.setState({points});
        this.sendData();
    };

    addPolyline() {
        let markers = [];

        for (let i = 0; i < this.state.markers.length; i++) {
            markers.push({lat: this.state.markers[i].position.lat, lng: this.state.markers[i].position.lng})
        }
        return markers;
    };

    handleMarkerRightclick (index, event) {
        /*
         * All you modify is data, and the view is driven by data.
         * This is so called data-driven-development. (And yes, it's now in
         * web front end and even with google maps API.)
         */
        var {markers} = this.state;
        markers = update(markers, {
            $splice: [
                [index, 1]
            ],
        });
        this.setState({ markers });
        
    };

    render() {
        this.getLocation();
        return (
            <Map google={this.props.google} zoom={14} onClick={this._onClick} center={this.state.center}
                 style={style} containerStyle={containerStyle}>

                {this.state.markers.map((marker, index) => {
                    return (
                        <Marker position={{lat: marker.position.lat, lng: marker.position.lng}} />
                    );
                })}
                <Polyline
                    path={this.addPolyline()}
                    strokeColor="#ff8000"
                    strokeOpacity={0.8}
                    strokeWeight={4}/>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAvIiRezGEiWzjKcmje9tzq56ePzFC5hVI')
})(CreateMap)