
import Point from './Point.js'
class Route{
  constructor(file){
    this.file = file;
    this.name='';
    this.points=[];
    this.comments='';
    this.media='';
    this.distance=0;
    this.rank=0;
    this.date='';
  }
  //constructor(name,description,points,comments,media){
    //this.name=name;
    //this.description=description;
    //this.points=points;
    //this.comments=comments;
    //this.media=media;
  //}
  PARSER(){
    
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
