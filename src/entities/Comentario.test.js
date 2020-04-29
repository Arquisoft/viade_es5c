import Comentario from "./Comentario";

const date = Date.now();
const comment1 = new Comentario(date, 'comentario 1');
const comment2 = new Comentario(null, null);
const comment3 = new Comentario();

describe.only('Create a new comment', () => {

    test('create succesfully',  () => {
        expect(comment1.getTexto() === 'comentario 1').toBe(true);
        expect(comment1.getFecha() === date).toBe(true);
    });

    test('change properties', () => {
        comment1.setAutor("autor");
        var newDate = new Date(2020, 4);
        comment1.setFecha(newDate);
        comment1.setTexto("nuevo comentario");

        expect(comment1.getAutor()).toBe('autor');
        expect(comment1.getFecha()).toBe(newDate);
        expect(comment1.getFormattedDate()).not.toBe('');
        expect(comment1.getTexto()).toBe('nuevo comentario');
    });
});

describe.only('comentarios nulos', () => {
    test('comprobando tipos nulables', () => {
        expect(comment2.getFecha()).toBe(null);
        expect(comment2.getFormattedDate()).toBe('');
        expect(comment2.getTexto()).toBe(null);
    });
});

describe.only('comentarios undefined', () => {
    test('comprobando tipos undefined', () => {
        expect(comment3.getFecha()).toBe(undefined);
        expect(comment3.getFormattedDate()).toBe('');
        expect(comment3.getTexto()).toBe(undefined);
    });
});