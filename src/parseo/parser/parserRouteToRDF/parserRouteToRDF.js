class ParserRouteToRDFClass {

    parse = route => {
        this.rdf = "";
        this.rdf = "@prefix viade: <http://arquisoft.github.io/viadeSpec/>. ";
        this.rdf += "@prefix : <http://example.org/>. ";
        this.rdf += "@prefix schema: <http://schema.org/>. ";
        this.rdf += "@prefix rdfs:   <http://www.w3.org/2000/01/rdf-schema#>. ";
        this.rdf += "@prefix xsd:    <http://www.w3.org/2001/XMLSchema#>. ";

        this.rdf += ":myRoute a viade:Route ;";
        this.rdf += 'schema:name "' + route.name + '" ;';
        if (route.description !== "") {
            this.rdf += 'schema:description "' + route.description + '" ;';
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
                this.rdf += "] .";
            } else {
                this.rdf += "] ;";
            }
        }
        return this.rdf.toString();
    };
}

const ParserRouteToRDF = new ParserRouteToRDFClass();
export {ParserRouteToRDF};