class Point{
  constructor(latitud,longitud,elevacion=""){
    this.latitud=latitud;
    this.longitud=longitud;
    this.elevacion="";
  }
  
  getPoint(){
    return {lat: this.latitud, long :this.long};
  }
  getLat(){
    return this.latitud;
  }
  getLng(){
    return this.longitud;
  }
  
}

export default Point;
