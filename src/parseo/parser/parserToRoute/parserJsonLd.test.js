import Route from "../../../entities/Route";
import JsonldToRouteParser from "./parserJsonLd";
import jsonld from '../../../../test/parser/jsonld'
import Point from "../../../entities/Point";
import Media from "../../../entities/Media";

test('Parser JSONld to Route', () => {
    let parserclass = new JsonldToRouteParser(JSON.stringify(jsonld));
    let points = [];
    points.push(new Point(45.123,34.121,1, 34));
    points.push(new Point(46.123,34.121,2, 36));
    points.push(new Point(47.123,34,3, 39));
    points.push(new Point(48.123,32.121,4));
    let medias = [];
    medias.push(new Media("http://inrupt.luispc1998/viade/resources/da34fas749sa3h883j.jpg",'','','image'));
    medias.push(new Media("http://inrupt.angelixus/viade/resources/pt92as74234a3h5xb3j.mp4",'','','video'));
    medias.push(new Media("http://inrupt.raupemol/viade/resources/da34zas4213sa7b542.png",'','','image'));
    medias.push(new Media("http://inrupt.luispc1998/viade/resources/da345432jtsa7b542e.mp4",'','','video'));


    const output = new Route("Route test 1",points,'Descripcion');
    output.setMedia(medias);
    expect(parserclass.parse()).toEqual(output);
});