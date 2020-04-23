import User from "./User";

const user1 = new User('nombre1', 'webid1','foto1');
const user2 = new User(null, null, null);
const user3 = new User();

describe.only('Create a new User', () => {

    test('create succesfully', async () => {
        expect(user1.getNombre() === 'nombre1').toBe(true);
        expect(user1.getWebId() === 'webid1').toBe(true);
        expect(user1.getFoto() === 'foto1').toBe(true);
    });

    test('change properties', () => {
        user1.nombre = "nuevonombre"
        user1.webId = 'nuevowebid'
        user1.foto = 'nuevafoto'

        expect(user1.getNombre()).toBe('nuevonombre');
        expect(user1.getWebId()).toBe('nuevowebid');
        expect(user1.getFoto()).toBe('nuevafoto');
    });
});

describe.only('users nulos', () => {
    test('comprobando tipos nulables', () => {
        expect(user2.getNombre()).toBe(null);
        expect(user2.getWebId()).toBe(null);
        expect(user2.getFoto()).toBe(null);
    });
});

describe.only('users undefined', () => {
    test('comprobando tipos undefined', () => {
        expect(user3.getNombre()).toBe(undefined);
        expect(user3.getWebId()).toBe(undefined);
        expect(user3.getFoto()).toBe(undefined);
    });
});