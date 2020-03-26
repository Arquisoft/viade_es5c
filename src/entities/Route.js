import Point from './Point.js'

class Route{
  constructor(name,points,comments="",description=""){
    this.name=name;
    this.points=points;
    this.description=description;
    this.comments=comments;
    this.media='';
    this.distance=0;
    this.rank=0;
    this.date='';
  }
  

  parseRoute() {
    console.log('parseando..');
    this.name= "Nombre Ruta"
    this.points.push(new Point(43.354856,-5.851450));
    this.points.push(new Point(43.364880,-5.851450));
    this.points.push(new Point(43.384900,-5.851450));
    console.log(this.points)
  }

  setName(name){
    this.name=name;
  }
  setDescription(description){
    this.comments = description;

  }
  setDistance(distance){
    this.distance=distance;
  }
  setRank(rank){
    this.rank=rank;
  }
  setDate(date){
    this.date=date;
  }
  getPoints(){
    return this.points;
  }
  
}

export default Route;
