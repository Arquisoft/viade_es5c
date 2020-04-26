import Route from "../../../entities/Route";
import Point from "../../../entities/Point";
import { ParserRouteToRDF } from "./parserRouteToRDF";

describe.only("Parser from Route to RDF", () => {

    const values=[[-5.09765625,39.90973623453719],[3.427734375,46.195042108660154],[14.414062499999998,51.28940590271679],[26.54296875,46.49839225859763]];
    let items=[];
    for (let i=0; i<values.length; i++) {
        let item = new Point(values[i][0], values[i][1], i);
        items.push(item);
    }
    const input= new Route("Prueba",items);
    const output=`@prefix viade: <http://arquisoft.github.io/viadeSpec/>. @prefix: <http://example.org/>. @prefix schema: <http://schema.org/>. @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>. @prefix xsd: <http://www.w3.org/2001/XMLSchema#>. :myRoute a viade:Route ;schema:name "Prueba" ;schema:description "undefined" ;viade:point [schema:latitude -5.09765625 ;schema:longitude 39.90973623453719 ;viade:order 0] ;viade:point [schema:latitude 3.427734375 ;schema:longitude 46.195042108660154 ;viade:order 1] ;viade:point [schema:latitude 14.414062499999998 ;schema:longitude 51.28940590271679 ;viade:order 2] ;viade:point [schema:latitude 26.54296875 ;schema:longitude 46.49839225859763 ;viade:order 3] .`;

    test("route to RDF", () => {
        let parser = ParserRouteToRDF;
        expect(parser.parse(input)).toEqual(output);
    });
});