import Point from './Point.js'
import { uuid } from 'uuidv4';

class Route {

    constructor(name, points, description = "", comments = "") {
        this.uuid = uuid;
        this.name = name;
        this.points = points;
        this.comments = comments;
        this.img = '';
        this.distance = 0;
        this.rank = 0;
        this.date = '';
    }

  parseRoute() {
    console.log('parseando..');
    this.name= "Nombre Ruta"
    this.points.push(new Point(43.354856,-5.851450));
    this.points.push(new Point(43.364880,-5.851450));
    this.points.push(new Point(43.384900,-5.851450));
    console.log(this.points)
  }
  setImg(img){
    this.img=img;
  }
  setName(name){
    this.name=name;
  }
  setDescription(description){
    this.description = description;

    }
    setDistance(distance) {
        this.distance = distance;
    }
    setRank(rank) {
        this.rank = rank;
    }
    setDate(date) {
        this.date = date;
    }
    getPoints() {
        return this.points;
    }
    getImg() {
        return this.img;
    }

    getUUID() {
        return this.uuid;
    }
}

export default Route;