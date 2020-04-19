import Point from "./Point";

const point1 = new Point('lat1', 'lon1',1);
const point2 = new Point(null, null, null);
const point3 = new Point();

describe.only('Create a new Point', () => {

    test('create succesfully', async () => {
        expect(point1.getLat() === 'lat1').toBe(true);
        expect(point1.getLng() === 'lon1').toBe(true);
        expect(point1.order === 1).toBe(true);
    });

    test('change properties', () => {
        point1.latitud = "nuevalat"
        point1.longitud = 'nuevalng'
        point1.order = 'nuevoord'

        expect(point1.getLat()).toBe('nuevalat');
        expect(point1.getLng()).toBe('nuevalng');
        expect(point1.order).toBe('nuevoord');
    });
});

describe.only('points nulos', () => {
    test('comprobando tipos nulables', () => {
        expect(point2.getLat()).toBe(null);
        expect(point2.getLng()).toBe(null);
        expect(point2.order).toBe(null);
    });
});

describe.only('points undefined', () => {
    test('comprobando tipos undefined', () => {
        expect(point3.getLat()).toBe(undefined);
        expect(point3.getLng()).toBe(undefined);
        expect(point3.order).toBe(undefined);
    });
});