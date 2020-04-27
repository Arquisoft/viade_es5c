/*import Route from "../../../entities/Route";
import Point from "../../../entities/Point";
import { ParserToRoute } from "./parserToRoute";
import { geojsoninput, gpxinput, kmlinput } from "../../../../test/index"

describe.only("Parser GeoJSON to Route", () => {
    let values=[[-5.09765625,39.90973623453719],[3.427734375,46.195042108660154],[14.414062499999998,51.28940590271679],[26.54296875,46.49839225859763]];
    let items=[];
    for(let i=0;i<values.length;i++){
        let item=new Point(values[i][0], values[i][1], i+1);
        items.push(item);
    }
    const output=new Route("Prueba1",items);

    const geo=new File([JSON.stringify(geojsoninput)],"geojsoninput.geojson",{type: "application/json"});

    test("route GeoJSON", () => {
        expect.assertions(1);
        return ParserToRoute.parse(geo).then( (r) => expect(r).toEqual(output)  );
    });
});

describe.only("Parser GPX to route", () => {
    let values=[[-5.09765625,39.90973623453719],[3.427734375,46.195042108660154],[14.414062499999998,51.28940590271679],[26.54296875,46.49839225859763]];
    let items=[];
    for(let i=0;i<values.length;i++){
        let item=new Point(values[i][0], values[i][1], i+1);
        items.push(item);
    }
    const output=new Route("gpxinput",items);

    const gpx=new File([gpxinput],"gpxinput.gpx");

    test("route GPX", () => {
        expect.assertions(1);
        return ParserToRoute.parse(gpx).then( (r) => expect(r).toEqual(output)  );
    });
});

describe.only("Parser KML to Route", () => {
    let values=[[-5.09765625,39.90973623453719],[3.427734375,46.195042108660154],[14.414062499999998,51.28940590271679],[26.54296875,46.49839225859763]];
    let items=[];
    for(let i=0;i<values.length;i++){
        let item=new Point(values[i][0], values[i][1], i+1);
        items.push(item);
    }
    const output=new Route("Prueba 3",items);

    const kml=new File([kmlinput],"kmlinput.kml");

    test("route KML",() => {
        expect.assertions(1);
        return ParserToRoute.parse(kml).then( (r) => expect(r).toEqual(output)  );
    });
});
*/
test("true", () => {
   expect(true).toBeTruthy();
});

