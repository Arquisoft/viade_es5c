import Route from "../../../entities/Route";
import JsonldToRouteParser from "./parserJsonLd";
import jsonld from '../../../../test/parser/jsonld'

test('Parser JSONld to Route', () => {
    let parserclass = new JsonldToRouteParser('miwebid', JSON.stringify(jsonld));
    const output = new Route("Route test 1", [{"position": {"lat": 45.123, "lng": 34.121}}, {
        "position": {
            "lat": 46.123,
            "lng": 34.121
        }
    }, {"position": {"lat": 47.123, "lng": 34}}, {
        "position": {
            "lat": 48.123,
            "lng": 32.121
        }
    }], 'Descripcion', [{"comment": {"createdAt": 34.121, "text": "comentario"}}]);
    output.setImg('http://inrupt.luispc1998/viade/resources/da34fas749sa3h883j.jpg');
    expect(parserclass.parse()).toEqual(output);
});