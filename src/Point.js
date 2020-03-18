class Point{
  constructor(latitud,longitud){
    this.latitud=latitud;
    this.longitud=longitud;
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
