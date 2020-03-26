import Point from "../../../entities/Point";
import Route from "../../../entities/Route";
import GPX from 'gpx-parser-builder';
import togeojson from "@mapbox/togeojson";

class ParserToRouteClass {
    
    selectParser = file => {
      const type = file.name.split(".")[1];
      switch (type) {
        case "geojson":
            return 1;
        case "gpx":
            return 2;
        case "kml":
            return 3;
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
                  const points = this.getCoordenadasGeoJSON(geoJSON);
                  var nombre=f.name.split(".")[0];
                    var descripcion="";
                    if (geoJSON.features[0].properties!==undefined){
                      if (geoJSON.features[0].properties.name!==undefined){
                        nombre=geoJSON.features[0].properties.name;
                      }
                      if (geoJSON.features[0].properties.description!==undefined){
                        descripcion=geoJSON.features[0].properties.description;
                      }

                    }
                    
                    
                    const  route = new Route(nombre, points,descripcion);
                  resolve(route);
                }catch(er){
                  //Mirar por qué no es válido
                  console.log("error");
                }
              };
              
        }
        if (parser===2){
          //gpx
          reader.onload = ()=> {
            var gpx;
            try{
              gpx=GPX.parse(reader.result);
            
              const points= this.getCoordenadasGPX(gpx);
              const  route = new Route(f.name.split(".")[0], points);
              resolve(route);
            }catch(er){

            }
          };
        }
        if (parser===3){
          //kml
          reader.onload = ()=> {
            var kml;
              var parser= new DOMParser();
              try{
                kml=parser.parseFromString(reader.result,"text/xml");
                if (kml.documentElement.nodeName==="kml"){
                  var geojson;
                  try{
                    geojson=(togeojson.kml(kml));
                    console.log(geojson);
                    const points= this.getCoordenadasKml(geojson);
                    var nombre=f.name.split(".")[0];
                    var descripcion="";
                    if (geojson.features[0].properties!==undefined){
                      if (geojson.features[0].properties.name!==undefined){
                        nombre=geojson.features[0].properties.name;
                      }
                      if (geojson.features[0].properties.description!==undefined){
                        descripcion=geojson.features[0].properties.description;
                      }

                    }
                    
                    
                    const  route = new Route(nombre, points,descripcion);

                    
                    resolve(route);
                  }catch(err){

                  }
                  
                }
              }catch(err){

              }
            
            
              
            
          };
        }
        reader.onerror=reject;
        reader.readAsText(f);
        
      });
    };

    getCoordenadasKml = geoJson =>{
        if (geoJson.features.length>1){
          //Error de que hay más de una unión y no se puede
        }
        else if(geoJson.features[0].geometry.type!=="LineString"){
          
          //
        }else{
          
          var array=new Array(geoJson.features[0].geometry.coordinates.length);
          for (var y=0;y<geoJson.features[0].geometry.coordinates.length;y++){
            if (geoJson.features[0].geometry.coordinates[y].length===3){
              array[y]=new Point(geoJson.features[0].geometry.coordinates[y][1],
                geoJson.features[0].geometry.coordinates[y][0],y+1,geoJson.features[0].geometry.coordinates[y][2]);
            
            }else{
              array[y]=new Point(geoJson.features[0].geometry.coordinates[y][1],
                geoJson.features[0].geometry.coordinates[y][0],y+1);
            
            }
          }
          return array;
        }
      
        
      
    }


    getCoordenadasGPX = gpx =>{
      var array= new Array(gpx.wpt.length);
      
      for(var i=0;i<gpx.wpt.length;i++){
        array[i]=new Point(gpx.wpt[i].$.lat,gpx.wpt[i].$.lon,i+1,gpx.wpt[i].ele);
      }
      return array;
      
    }

    getCoordenadasGeoJSON = geoJson =>{
        //SI ES UNA RUTA SOLO O SEA UNIÓN DE PUNTOS, SOLO TIENE UN FEATURES, QUE TIENE UN ARRAY DE PUNTOS
        //SI SON PUNTOS, HAY MÁS DE UN FEATURES PERO CON UN PUNTO CADA UNO SOLO
        //SI SE PUEDE TODO, ES UNA MEZCLA DE LO ANTERIOR.
        console.log(geoJson);
        if (geoJson.features.length>1){
          //Error de que hay más de una unión y no se puede
        }else if(geoJson.features[0].geometry.type!=="LineString"){
          //
          
        }else{
          
          var array=new Array(geoJson.features[0].geometry.coordinates.length);
          for (var y=0;y<geoJson.features[0].geometry.coordinates.length;y++){
            
            array[y]=new Point(geoJson.features[0].geometry.coordinates[y][0],
              geoJson.features[0].geometry.coordinates[y][1],y+1);
          }
                      
          return array;
        }
        
        
        
    }
  }
  


  const ParserToRoute = new ParserToRouteClass();
  
  
  export {ParserToRoute};