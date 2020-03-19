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
                  
                  const  route = new Route(f.name.split(".")[0], points);
                  console.log(route)
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
        
        
        
        //SI ES UNA RUTA SOLO O SEA UNIÓN DE PUNTOS, SOLO TIENE UN FEATURES, QUE TIENE UN ARRAY DE PUNTOS
        //SI SON PUNTOS, HAY MÁS DE UN FEATURES PERO CON UN PUNTO CADA UNO SOLO
        //SI SE PUEDE TODO, ES UNA MEZCLA DE LO ANTERIOR.
        
        if (coordinates.features.length>1){
          //Error de que hay más de una unión y no se puede
        }else if(coordinates.features[0].geometry.type!=="LineString"){
          //
          
        }else{
          
          var array=new Array(coordinates.features[0].geometry.coordinates.length);
          for (var y=0;y<coordinates.features[0].geometry.coordinates.length;y++){
            
            array[y]=new Point(coordinates.features[0].geometry.coordinates[y][0],
              coordinates.features[0].geometry.coordinates[y][1]);
          }
                      
          return array;
        }
        
        
        
    }
  }
  


  const parser = new ParserToRoute();
  
  
  export default parser;