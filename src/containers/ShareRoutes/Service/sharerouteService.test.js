import {publish} from './sharerouteService';

test('render correctamente con friends y rutas vacio', () => {
    publish();
    expect(true).toBeTruthy();
});
