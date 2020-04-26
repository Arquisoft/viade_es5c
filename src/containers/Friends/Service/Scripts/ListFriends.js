import data from '@solid/query-ldflex';

export async function listFriends() {
    this.setState({isLoading: true});
    const {webId} = this.props;
    const user = data[webId];
    let friends = [];

    for await (const friend of user.friends) {
        const friendWebId = await friend.value;
        const friend_data = data[friendWebId];
        const name = await friend_data.name;

        var information = {
            "webId": friendWebId,
            "name": name.toString()
        };
        friends.push(information);
    }
    return friends;
}