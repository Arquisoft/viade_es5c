import Route from "../../../entities/Route";
import Point from "../../../entities/Point";
import { ParserRouteToRDF } from "./parserRouteToRDF";
import Media from "../../../entities/Media";

const pointsValues = [[-5.09765625,39.90973623453719],[3.427734375,46.195042108660154],[14.414062499999998,51.28940590271679],[26.54296875,46.49839225859763]];
var points=[];
for (let i=0; i<pointsValues.length; i++) {
    let item = new Point(pointsValues[i][0], pointsValues[i][1], i, i + 10);
    points.push(item);
}

describe.only("Parser from Route sin media to RDF", () => {
    const input = new Route("Prueba",points, 'descripcion prueba');
    const output = `@prefix viade: <http://arquisoft.github.io/viadeSpec/>. @prefix : <http://example.org/>. @prefix schema: <http://schema.org/>. @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>. @prefix xsd: <http://www.w3.org/2001/XMLSchema#>. :myRoute a viade:Route ;schema:name "Prueba";schema:description \"descripcion prueba\";viade:point [schema:latitude -5.09765625 ;schema:longitude 39.90973623453719 ;viade:order 0 ;schema:elevation 10] ;viade:point [schema:latitude 3.427734375 ;schema:longitude 46.195042108660154 ;viade:order 1 ;schema:elevation 11] ;viade:point [schema:latitude 14.414062499999998 ;schema:longitude 51.28940590271679 ;viade:order 2 ;schema:elevation 12] ;viade:point [schema:latitude 26.54296875 ;schema:longitude 46.49839225859763 ;viade:order 3 ;schema:elevation 13] .`;

    test("route without media to RDF", () => {
        expect(ParserRouteToRDF.parse(input)).toEqual(output);
    });
});

describe.only("Parser from Route sin media ni elevacion to RDF", () => {
    var points2=[];
    for (let i=0; i<pointsValues.length; i++) {
        let item = new Point(pointsValues[i][0], pointsValues[i][1], i);
        points2.push(item);
    }
    const input = new Route("Prueba",points2, 'descripcion prueba');
    const output = `@prefix viade: <http://arquisoft.github.io/viadeSpec/>. @prefix : <http://example.org/>. @prefix schema: <http://schema.org/>. @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>. @prefix xsd: <http://www.w3.org/2001/XMLSchema#>. :myRoute a viade:Route ;schema:name "Prueba";schema:description \"descripcion prueba\";viade:point [schema:latitude -5.09765625 ;schema:longitude 39.90973623453719 ;viade:order 0] ;viade:point [schema:latitude 3.427734375 ;schema:longitude 46.195042108660154 ;viade:order 1] ;viade:point [schema:latitude 14.414062499999998 ;schema:longitude 51.28940590271679 ;viade:order 2] ;viade:point [schema:latitude 26.54296875 ;schema:longitude 46.49839225859763 ;viade:order 3] .`;

    test("route without media and elevation to RDF", () => {
        expect(ParserRouteToRDF.parse(input)).toEqual(output);
    });
});

describe.only("Parser from Route con media to RDF", () => {
    let media=[];
    media.push(new Media('miurl', 'autor', new Date(2020,4,28,1,20,0,0),'image'));

    var input2= new Route("Prueba",points);
    input2.setMedia(media);
    const output2 = `@prefix viade: <http://arquisoft.github.io/viadeSpec/>. @prefix : <http://example.org/>. @prefix schema: <http://schema.org/>. @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>. @prefix xsd: <http://www.w3.org/2001/XMLSchema#>. :myRoute a viade:Route ;schema:name "Prueba";viade:point [schema:latitude -5.09765625 ;schema:longitude 39.90973623453719 ;viade:order 0 ;schema:elevation 10] ;viade:point [schema:latitude 3.427734375 ;schema:longitude 46.195042108660154 ;viade:order 1 ;schema:elevation 11] ;viade:point [schema:latitude 14.414062499999998 ;schema:longitude 51.28940590271679 ;viade:order 2 ;schema:elevation 12] ;viade:point [schema:latitude 26.54296875 ;schema:longitude 46.49839225859763 ;viade:order 3 ;schema:elevation 13] ;viade:hasMediaAttached :media1. :media1 schema:contentUrl <miurl>; schema:publishedDate \"2020-4-28T1:20:0\"^^xsd:dateTime ; schema:author <autor> . `;

    test("route to RDF with media", () => {
        expect(ParserRouteToRDF.parse(input2)).toEqual(output2);
    });
});

describe.only("Parser from Route con varios media to RDF", () => {
    let media=[];
    media.push(new Media('miurl', 'autor', new Date(2020,4,28,1,20,0,0),'image'));
    media.push(new Media('miurl2', 'autor2', new Date(2020,4,28,1,20,0,0),'image2'));

    var input3= new Route("Prueba",points);
    input3.setMedia(media);
    const output3 = `@prefix viade: <http://arquisoft.github.io/viadeSpec/>. @prefix : <http://example.org/>. @prefix schema: <http://schema.org/>. @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>. @prefix xsd: <http://www.w3.org/2001/XMLSchema#>. :myRoute a viade:Route ;schema:name "Prueba";viade:point [schema:latitude -5.09765625 ;schema:longitude 39.90973623453719 ;viade:order 0 ;schema:elevation 10] ;viade:point [schema:latitude 3.427734375 ;schema:longitude 46.195042108660154 ;viade:order 1 ;schema:elevation 11] ;viade:point [schema:latitude 14.414062499999998 ;schema:longitude 51.28940590271679 ;viade:order 2 ;schema:elevation 12] ;viade:point [schema:latitude 26.54296875 ;schema:longitude 46.49839225859763 ;viade:order 3 ;schema:elevation 13] ;viade:hasMediaAttached :media1; viade:hasMediaAttached :media2. :media1 schema:contentUrl <miurl>; schema:publishedDate \"2020-4-28T1:20:0\"^^xsd:dateTime ; schema:author <autor> . :media2 schema:contentUrl <miurl2>; schema:publishedDate \"2020-4-28T1:20:0\"^^xsd:dateTime ; schema:author <autor2> . `;

    test("route to RDF with many media", () => {
        expect(ParserRouteToRDF.parse(input3)).toEqual(output3);
    });
});

describe.only("Parser from Route sin media ni points to RDF", () => {
    let points3=[];
    const input4= new Route("Prueba",points3);
    const output3 = `@prefix viade: <http://arquisoft.github.io/viadeSpec/>. @prefix : <http://example.org/>. @prefix schema: <http://schema.org/>. @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>. @prefix xsd: <http://www.w3.org/2001/XMLSchema#>. :myRoute a viade:Route ;schema:name "Prueba".`;

    test("route to RDF without media and points", () => {
        expect(ParserRouteToRDF.parse(input4)).toEqual(output3);
    });
});