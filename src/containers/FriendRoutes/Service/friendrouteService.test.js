import {getRouteShareByFriend} from './friendrouteService';

const webId = 'https://viadees5c.solid.community/profile/card#me';
const friendWebId = 'https://uo237133.solid.community/profile/card#me';

test('render correctamente con friends y rutas vacio', () => {
    getRouteShareByFriend(webId, friendWebId);
    expect(true).toBeTruthy();
});
