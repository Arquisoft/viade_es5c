import React, {Component} from 'react';
import {Map,Marker, GoogleApiWrapper} from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '75%'
};

export class RouteVisualizer extends Component {
  
  constructor(props) {
    super(props);
    this.ruta =  this.props.ruta
    this.ruta.parseRoute()
    console.log(this.ruta)
  }
    /*this.state = {
      stores: [{lat: 47.49855629475769, lng: -122.14184416996333},
              {latitude: 47.359423, longitude: -122.021071},
              {latitude: 47.2052192687988, longitude: -121.988426208496},
              {latitude: 47.6307081, longitude: -122.1434325},
              {latitude: 47.3084488, longitude: -122.2140121},
              {latitude: 47.5524695, longitude: -122.0425407}]
    }
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
       lat: store.latitude,
       lng: store.longitude
     }}
     onClick={() => console.log("You clicked me!")} />
    })
  }*/

  render() {
  return (<div><h1 > {this.ruta.name}</h1>
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ 
            lat: 43.354856,
            lng: -5.851450}}
        >
        {this.drawRoute()}
        </Map>
        </div>);
  }


  drawRoute = () => {
    return this.ruta.points.map((p, index) => {
      return <Marker key={index} id={index} position={{
       lat: p.latitud,
       lng: p.longitud
     }}
     onClick={() => console.log("You clicked me!")} />
    })
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAvIiRezGEiWzjKcmje9tzq56ePzFC5hVI'
})(RouteVisualizer);