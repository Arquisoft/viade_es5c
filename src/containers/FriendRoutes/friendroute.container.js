import React, {Component} from "react";
import data from "@solid/query-ldflex";
import FriendRoute from "./friendroute.component";
import {getRouteShareByFriend} from "./Service/friendrouteService";

export class FriendrouteContainer extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            friends: []
        }
    }

    componentDidMount() {
        const { webId } = this.props;
        if (webId) this.getRoutesSharedWithMe();
    }

    componentDidUpdate(prevProps) {
        const { webId } = this.props;
        if (webId && webId !== prevProps.webId) this.getRoutesSharedWithMe();
    }

    getRoutesSharedWithMe = async () => {
        this.setState({ isLoading: true });
        const { webId } = this.props;
        const user = data[webId];
        let friends = [];
        let friendWebId = "";

        for await (const friend of user.friends) {
            friendWebId = await friend.value;
            let routes = await getRouteShareByFriend(webId, friendWebId)
            if(!routes.length==0){
                friends.push(routes + '\n');
            }

        }

        this.setState({ friends });
        console.log("Lista " + friends);
    }

    render() {
        const { friends } = this.state;
        return (
            <FriendRoute {...{friends}} />
        );
    }
}