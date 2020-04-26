import data from '@solid/query-ldflex';

const auth = require('solid-auth-client');

export async function listFriends() {
    const session = await auth.currentSession();
    const user = data[session.webId];
    let friends = [];

    for await (const friend of user.friends) {
        const friendWebId = await friend.value;
        const friend_data = data[friendWebId];
        const name = await friend_data.name;

        let information = {
            "webId": friendWebId,
            "name": name.toString()
        };

        friends.push(information);
    }
    return friends;
}