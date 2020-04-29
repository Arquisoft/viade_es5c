class ParserRouteToRDFClass {

    parse = route => {
        this.rdf = "";
        this.rdf = "@prefix viade: <http://arquisoft.github.io/viadeSpec/>. ";
        this.rdf += "@prefix: <http://example.org/>. ";
        this.rdf += "@prefix schema: <http://schema.org/>. ";
        this.rdf += "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>. ";
        this.rdf += "@prefix xsd: <http://www.w3.org/2001/XMLSchema#>. ";

        this.rdf += ":myRoute a viade:Route ;";
        this.rdf += 'schema:name "' + route.name + '"';
        if (route.description !== "") {
            this.rdf+=";";
            this.rdf += 'schema:description "' + route.description + '"';
        }
        if (route.points.length===0 && route.media.length===0){
            this.rdf+=".";
        }else{
            this.rdf+=";";
        }
        for (var i = 0; i < route.points.length; i++) {
            this.rdf += "viade:point [";
            this.rdf += 'schema:latitude ' + route.points[i].latitud + ' ;';
            this.rdf += 'schema:longitude ' + route.points[i].longitud + ' ;';
            if (route.points[i].elevacion === "") {
                this.rdf += 'viade:order ' + route.points[i].order;
            } else {
                this.rdf += 'viade:order ' + route.points[i].order + ' ;';
                this.rdf += 'schema:elevation ' + route.points[i].elevacion;
            }
            if (i === route.points.length - 1) {
                if(route.media.length>0){
                    this.rdf += "] ;";
                }else{
                    this.rdf += "] .";
                }
            } else {
                this.rdf += "] ;";
            }
        }

        if (route.media.length>0){
            for (var j=0;j<route.media.length;j++){
                this.rdf+="viade:hasMediaAttached :media"+(j+1);
                if (j === route.media.length - 1) {
                    this.rdf+=". ";
                }else{
                    this.rdf+="; ";
                }
            }
            for (var z=0;z<route.media.length;z++){
                this.rdf+=":media"+(z+1)+" schema:contentUrl <"+route.media[z].contentUrl+">; ";
                let año=route.media[z].publicationTime.getFullYear();
                let mes=route.media[z].publicationTime.getMonth();
                let dia=route.media[z].publicationTime.getDate();
                let hora=route.media[z].publicationTime.getHours();
                let min=route.media[z].publicationTime.getMinutes();
                let seg=route.media[z].publicationTime.getSeconds();
                let completo='"'+año+'-'+mes+'-'+dia+"T"+hora+":"+min+":"+seg+'"';

                this.rdf+='schema:publishedDate '+completo+'^^xsd:dateTime ; ';
                this.rdf+="schema:author <"+route.media[z].author+"> . ";
            }
        }
        return this.rdf.toString();
    };
}

const ParserRouteToRDF = new ParserRouteToRDFClass();
export {ParserRouteToRDF};