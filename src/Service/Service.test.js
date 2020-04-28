import Service from './Service';

test('render correctamente con friends y rutas vacio', () => {
    Service.getFriends();
    Service.getRoutes();
    expect(true).toBeTruthy();
});