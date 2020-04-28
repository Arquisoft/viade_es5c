import Route from "../../../entities/Route";
import Point from "../../../entities/Point";
import { ParserToRoute } from "./parserToRoute";

describe.only("Parser GeoJSON to Route", () => {
    let values=[[-5.09765625,39.90973623453719],[3.427734375,46.195042108660154],[14.414062499999998,51.28940590271679]];
    let items=[];
    for(let i=0;i<values.length;i++){
        let item=new Point(values[i][0], values[i][1], i+1);
        items.push(item);
    }
    const output=new Route("Prueba1",items, "Description prueba 1");
    const json = '{"type": "FeatureCollection", "features": [{"type": "Feature", "properties": {"name": "Prueba1", "description": "Description prueba 1"}, "geometry": {"type": "LineString", "coordinates": [[-5.09765625, 39.90973623453719], [3.427734375, 46.195042108660154], [14.414062499999998, 51.28940590271679]]}}]}';
    const file = new File([json], "track.geojson");

    test("route GeoJSON", () => {
        expect(ParserToRoute.parse(file)).resolves.toEqual(output);
    });
});

describe.only("Parser GPX to route", () => {
    let values=[[42.4809,0.429994,866.177978515625],[42.481052,0.429961,870.650024414062],[42.481207,0.430114,875.153991699219],[42.481312,0.430203,872.718017578125]];
    let items=[];
    for(let i=0;i<values.length;i++){
        let item=new Point(JSON.stringify(values[i][0]), JSON.stringify(values[i][1]), i+1, JSON.stringify(values[i][2]));
        items.push(item);
    }
    const output=new Route("track",items);
    const gpx = `<?xml version="1.0" encoding="UTF-8"?><gpx creator="phpGPX PRAMES S.A." version="1.1" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd"><metadata/><wpt lat="42.510754" lon="0.467682"><ele>1230.77099609375</ele><name>ERMITA NUESTRA SEÑORA DE GRACIA</name><cmt></cmt><desc><![CDATA[]]></desc></wpt><wpt lat="42.58805" lon="0.491742"><ele>1079.89099121094</ele><name>ERISTE</name><cmt></cmt><desc><![CDATA[]]></desc></wpt><wpt lat="42.588064" lon="0.491715"><ele>1079.89099121094</ele><name>ERISTE - FIN</name><cmt></cmt><desc><![CDATA[]]></desc></wpt><wpt lat="42.574974" lon="0.465111"><ele>1083.05798339844</ele><name>SAHUN</name><cmt></cmt><desc><![CDATA[]]></desc></wpt><wpt lat="42.58804" lon="0.491771"><ele>1080</ele><name>ERISTE</name><cmt></cmt><desc><![CDATA[]]></desc></wpt><wpt lat="42.576209" lon="0.467047"><ele>1094.96899414062</ele><name>SAHUN</name><cmt></cmt><desc><![CDATA[]]></desc></wpt><wpt lat="42.576037" lon="0.467048"><ele>1089.94201660156</ele><name>SAHUN - INICIO</name><cmt></cmt><desc><![CDATA[]]></desc></wpt><wpt lat="42.547257" lon="0.460916"><ele>1015.61199951172</ele><name>VILLANOVA</name><cmt></cmt><desc><![CDATA[]]></desc></wpt><wpt lat="42.581689" lon="0.471013"><ele>1097.69104003906</ele><name>SANTUARIO DE GUAYENTE</name><cmt></cmt><desc><![CDATA[]]></desc></wpt><wpt lat="42.52199" lon="0.46455"><ele>1219.64501953125</ele><name>CHIA</name><cmt></cmt><desc><![CDATA[]]></desc></wpt><wpt lat="42.486996" lon="0.432726"><ele>984.215026855469</ele><name>ERMITA DE LA PIEDAD</name><cmt></cmt><desc><![CDATA[]]></desc></wpt><wpt lat="42.576039" lon="0.467046"><ele>1089.94201660156</ele><name>SAHUN</name><cmt></cmt><desc><![CDATA[]]></desc></wpt><wpt lat="42.520551" lon="0.46558"><ele>1193.12097167969</ele><name>CHIA</name><cmt></cmt><desc><![CDATA[]]></desc></wpt><wpt lat="42.520124" lon="0.466097"><ele>1188.00305175781</ele><name>CHIA</name><cmt></cmt><desc><![CDATA[]]></desc></wpt><wpt lat="42.4809" lon="0.429994"><ele>866.177978515625</ele><name>SEIRA</name><cmt></cmt><desc><![CDATA[]]></desc></wpt><wpt lat="42.522291" lon="0.464345"><ele>1220.0439453125</ele><name>CHIA</name><cmt></cmt><desc><![CDATA[]]></desc></wpt><wpt lat="42.587725" lon="0.492258"><ele>1080.92102050781</ele><name>A ERISTE</name><cmt></cmt><desc><![CDATA[]]></desc></wpt><trk><name>PR-HU 51. Seira – Chía – Villanova – Sahún - Eriste</name><desc></desc><trkseg><trkpt lat="42.4809" lon="0.429994"><ele>866.177978515625</ele></trkpt><trkpt lat="42.481052" lon="0.429961"><ele>870.650024414062</ele></trkpt><trkpt lat="42.481207" lon="0.430114"><ele>875.153991699219</ele></trkpt><trkpt lat="42.481312" lon="0.430203"><ele>872.718017578125</ele></trkpt></trkseg></trk></gpx>`;
    const file = new File([gpx], "track.gpx");

    test("route GPX", () => {
        expect(ParserToRoute.parse(file)).resolves.toEqual(output);
    });
});

describe.only("Parser KML to Route", () => {
    let values=[[36.07954952145647,-112.2550785337791],[36.08117083492122,-112.2549277039738],[36.08260761307279,-112.2552505069063],[36.08395660588506,-112.2564540158376]];
    let items=[];
    for(let i=0;i<values.length;i++){
        let item=new Point(values[i][0], values[i][1], i+1, 2357);
        items.push(item);
    }
    const output=new Route("Prueba kml",items, 'Description prueba kml');
    const kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2"> <Document>
 <name>Rutas</name>
 <description>Ejemplos de rutas. Observa que la etiqueta tessellate se establece de forma predeterminada
 en 0. Si quieres crear líneas teseladas, deben crearse
 (o editarse) directamente en KML.</description> <Style id="yellowLineGreenPoly">
 <LineStyle>
 <color>7f00ffff</color>
 <width>4</width>
 </LineStyle>
 <PolyStyle>
 <color>7f00ff00</color>
 </PolyStyle>
 </Style> <Placemark>
 <name>Prueba kml</name>
 <description>Description prueba kml</description>
 <styleUrl>#yellowLineGreenPoly</styleUrl>
 <LineString>
 <extrude>1</extrude>
 <tessellate>1</tessellate>
 <altitudeMode>absoluto</altitudeMode>
 <coordinates> -112.2550785337791,36.07954952145647,2357
 -112.2549277039738,36.08117083492122,2357
 -112.2552505069063,36.08260761307279,2357
 -112.2564540158376,36.08395660588506,2357 </coordinates>
 </LineString> </Placemark>
 </Document> </kml>`;
    const file = new File([kml], "track.kml");

    test("route KML", () => {
        expect(ParserToRoute.parse(file)).resolves.toEqual(output);
    });
});

describe.only("Parser NoFile to Route", () => {
    const nofile=new File(['input'],"input.AAA");

    test("route NoFile",() => {
        expect(ParserToRoute.parse(nofile)).rejects.toEqual('');
    });
});
