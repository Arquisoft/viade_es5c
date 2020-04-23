  
import Route from "../../../entities/Route";

class JsonldToRouteParser{
    constructor(webID, file) {
        this.webID = webID;
        this.file = file;
    }

    parse(){
        var jsonld = JSON.parse(this.file);
        let name = jsonld.name;
        let description = jsonld.description;
        let points = [];
        let commentsAux = jsonld.comments;
        let media = jsonld.media;
        let images = [];
        let comments = [];
        try {
            media.map(function (media) {
                if (media["@id"].toString().includes(".jpg")) {
                    images.push(media["@id"]);
                }
                if (media["@id"].toString().includes(".png")) {
                    images.push(media["@id"]);
                }

            });
        } catch (e) {}

        try {
            commentsAux.map(function (comment) {
                if (comment.text != null && comment.createdAt != null) {
                    let text = comment.text;
                    let createdAt = comment.createdAt;
                    let comentario = {comment: {text: text, createdAt: createdAt}};
                    comments.push(comentario)
                }
            });
        } catch (e) {}

        try {
            jsonld.points.map(function (point) {
                points.push({position: {lat: point.latitude, lng: point.longitude}});
            });
        } catch (e) {}
        let ruta =new Route(name,points, description, comments);
        ruta.setImg(images[0]);
        return ruta;
    }

}

export default JsonldToRouteParser;