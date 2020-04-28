  
import Route from "../../../entities/Route";
import Point from "../../../entities/Point";
import Media from "../../../entities/Media";

class JsonldToRouteParser{
    constructor(file) {
        this.file = file;
    }

    parse(){
        var jsonld = JSON.parse(this.file);
        let name = jsonld.name;
        let description = jsonld.description;
        let points = [];
        let media = jsonld.media;
        let images = [];
        try {
            media.forEach(function (media) {
                if (media["@id"].toString().includes(".jpg")||media["@id"].toString().includes(".png")
                ||media["@id"].toString().includes(".gif")||media["@id"].toString().includes(".jpeg")) {
                    images.push(new Media(media["@id"],"","","image"));
                }
                if (media["@id"].toString().includes(".avi")||media["@id"].toString().includes(".mp4")) {
                    images.push(new Media(media["@id"],"","","video"));
                }

            });
        } catch (e) {}
        

        try {
            let contador=1;
            jsonld.points.forEach(function (point) {
                if (point["elevation"]===undefined){
                    points.push(new Point(point["latitude"].toString(),point["longitude"].toString(),contador));
                }else{
                    points.push(new Point(point["latitude"].toString(),point["longitude"].toString(),contador,
                    point["elevation"].toString()));
                }
                contador=contador+1;
                
            });
        } catch (e) {}
        let ruta =new Route(name,points, description, "");
        ruta.media=images;
        return ruta;
    }

}

export default JsonldToRouteParser;