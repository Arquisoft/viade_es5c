import Route from "./Route";
import Point from "./Point";

const point1 = new Point('lat1', 'lon1',1);
const point2 = new Point('lat2', 'lon2',2);

const route1 = new Route('name1', '');
const route2 = new Route(null, null);
const route3 = new Route();

describe.only('Create a new Route', () => {

    test('create succesfully', async () => {
        expect(route1.name === 'name1').toBe(true);
        expect(route1.getPoints() === '').toBe(true);
    });

    test('change properties', () => {
        route1.setName('nuevonombre')
        var points = []
        points.push(point1);
        points.push(point2);
        route1.points = points
        route1.setDescription('nuevadescription')
        route1.setImg('/rutaimagen')
        route1.setDistance('nuevadistance')
        route1.setRank('nuevorank')
        route1.setDate('nuevadate')

        expect(route1.name).toBe('nuevonombre');
        expect(route1.getPoints()).toBe(points);
        expect(route1.description).toBe('nuevadescription');
        expect(route1.getImg()).toBe('/rutaimagen');
        expect(route1.distance).toBe('nuevadistance');
        expect(route1.rank).toBe('nuevorank');
        expect(route1.date).toBe('nuevadate');
    });
});

describe.only('routes nulos', () => {
    test('comprobando tipos nulables', () => {
        expect(route2.name).toBe(null);
        expect(route2.points).toBe(null);
    });
});

describe.only('routes undefined', () => {
    test('comprobando tipos undefined', () => {
        expect(route3.name).toBe(undefined);
        expect(route3.points).toBe(undefined);
    });
});