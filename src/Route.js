

class Route{
  constructor(file){
    this.file = file;
    this.name='';
    this.points=[];
    this.comments='';
    this.media='';
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
    
    console.log(this.file)
   

  }
  
}

export default Route;
