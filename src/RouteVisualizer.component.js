import React, {Component} from 'react';
import {Map,Marker,Polyline, GoogleApiWrapper} from 'google-maps-react';

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
    this.pathCoordinates=[];
    
  }
    

  render() {
  return (<div><h1 > {this.ruta.name}</h1>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{ 
            lat: this.ruta.points[0].latitud,
            lng: this.ruta.points[0].longitud}}
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
     onClick={() => console.log("You clicked me!")} />
     
    })
  }
  addPolyline(){
    for (var i=0;i< this.ruta.points.length;i++){
      console.log(i);
      this.pathCoordinates.push({lat: this.ruta.points[i].getLat(), lng: this.ruta.points[i].getLng()});
               
    }
  
    return <Polyline path={this.pathCoordinates}></Polyline>
  }
}
  
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAvIiRezGEiWzjKcmje9tzq56ePzFC5hVI'
})(RouteVisualizer);