import Point from "../../entities/Point";
import Route from "../../entities/Route";
class ParserToRoute {
    
    selectParser = file => {
      const type = file.name.split(".")[1];
      switch (type) {
        case "geojson":
            return 1;
        default:
          console.log("formato no soportado");
          break;
      }
    };
  
    parse =  file => {
      const f = file;
      const parser = this.selectParser(f);
      
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        if (parser===1){//Si es geojson
            console.log("Es geojson");
            
            reader.onload = ()=> {
                //resolve(parser.execute(reader.result));
                var geoJSON;
                try{
                  geoJSON = JSON.parse(reader.result);
                  const points = this.getCoordenadas(geoJSON);
                  console.log(points)
                  const  route = new Route(f.name, points);
                  console.log(route);
                  resolve(route);
                }catch(er){
                  //Mirar por qué no es válido
                  console.log("error");
                  //console.error(er);
                }
                
                 
                
              };
              
        }
        
        reader.onerror=reject;
        reader.readAsText(f);
        
      });
    };
    getCoordenadas = coordinates =>{
        

        var array=new Array(coordinates.features.length);
        for (var y=0;y<coordinates.features.length;y++){
          array[y]=new Point(coordinates.features[y].geometry.coordinates[0],
            coordinates.features[y].geometry.coordinates[1])
        }
        return array;
    }
  }
  


  const parser = new ParserToRoute();
  
  
  export default parser;