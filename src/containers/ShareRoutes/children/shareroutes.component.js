import React from "react";
import auth from 'solid-auth-client';
import FC from 'solid-file-client';
import {ShareRouteService} from "../Service";
import {NotificationTypes} from '@inrupt/solid-react-components';
import {RouteView} from "../../RoutesView/children/RouteView";

class CreateShareRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routeWebID: '',
            friendWebID: ''
        }
        this.fc = new FC(auth);

    }

    shareRoute = async () => {

        try {
            var session = await auth.currentSession();

            const contentNotif = {
                title: "Route share",
                summary: "has shared you a route.",
                actor: session.webId,
                object: this.state.routeWebID,
                target: this.state.friendWebID
            };
            console.log(await ShareRouteService.publish(this.props.sendNot, this.props.discoverIn, contentNotif, this.state.friendWebID, NotificationTypes.OFFER));
            console.log("se supone que subido");
        } catch (error) {
            console.log(error);
            alert("Could not share the route");
        }


    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value})
    }

    handleSubmit = e => {
        e.preventDefault()
        //const values = JSON.stringify(this.state)
        //console.log(this.state.routeWebID + " " + this.state.friendWebID);
        //this.shareRoute();
    }


    render() {
        const shareRoute = {
            shareRouteWith: this.shareRoute.bind(this)
        };

        return (
            <RouteView {...{shareRoute}}/>
        );
    }
}

export default CreateShareRoute;