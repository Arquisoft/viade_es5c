import {Route, Point} from '../../../entities/';
import * as comunica from "@comunica/actor-init-sparql";

export class ParserRDF {

    parse = async url => {
        const engine = comunica.newEngine();
        const sparql =
            `PREFIX schema: <http://schema.org/>
            PREFIX viade:<http://arquisoft.github.io/viadeSpec/>
            PREFIX rdf:    <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      
            SELECT ?latitude ?longitude ?order ?name ?description ?name ?elevation WHERE {
            ?route a viade:Route.
            ?route viade:point ?point .
            ?point schema:latitude ?lat ;
                schema:longitude ?long ;
                viade:order ?order.
            OPTIONAL {?route schema:description ?description.}
            OPTIONAL {?route schema:name ?name.}
            OPTIONAL {?point schema:elevation ?elevation.}
        }`;

        const result = await engine.query(sparql, {sources: [url]});
        const {data} = await engine.resultToString(result, "application/json");

        return new Promise((resolve, reject) => {
            let text = "";
            data.on("data", (chunk) => {
                text += chunk;
            });

            data.on("end", () => {
                resolve(this.getRoute(JSON.parse(text)));
            });
        });
    };

    getRoute=(results) => {
        if(!results||!results.length) {return;}
        let items=results.map((i) => new Point(this.parseToFloat(i["?long"]),this.parseToFloat(i["?lat"]),this.parseToFloat(i["?order"]),this.parseToFloat(i["?elevation"])));
        return new Route(this.cleanValue(results[0]["?name"]),items,this.cleanValue(results[0]["?description"]));
    };

    cleanValue=(value) => {
        if(!value)return;
        return value.split("^^")[0].replace(/['"]+/g,"");
    };

    parseToFloat=(value) => {
        if(!value){return;}
        let clean=this.cleanValue(value);
        return parseFloat(clean);
    }

}
