import Point from "../../entities/Point";

class ParserToRoute {
    constructor() {}
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
      const route;
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        if (parser==1){//Si es geojson

        }
        reader.onload = ()=> {
          //resolve(parser.execute(reader.result));
          const geoJSON = JSON.parse(reader.result);
            const points = this.getCoordenadas(geoJSON.coordinates);
            route = new RouteViade(f.name, points);
            resolve(route);
        };
        reader.onerror=reject;
        reader.readAsText(f);
      });
    };
  }
  getCoordenadas = coordinates =>{
      return coordinates.map(cord=>{
        return new Point(cord[0], cord[1])
      });
  }
  const parser = new ParserToRoute();
  
  
  export default parser;