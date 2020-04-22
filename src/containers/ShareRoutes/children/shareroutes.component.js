import React from "react";
import {ShareWrapper, Input, Label} from "../shareroutes.style";
import auth from 'solid-auth-client';
import FC from 'solid-file-client';
import {ShareRouteService} from "../Service";
import {NotificationTypes} from '@inrupt/solid-react-components';

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
            await ShareRouteService.publish(this.props.sendNot, contentNotif, this.state.friendWebID, NotificationTypes.OFFER);
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
        this.shareRoute();
    }


    render() {

        const {routeWebID, friendWebID} = this.state
        return (
            <ShareWrapper>
                <div>
                    <h1>Insert the following webID's to share the route</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <Label>Route's webID:
                                <Input
                                    type="text"
                                    name="routeWebID"
                                    value={routeWebID}
                                    onChange={this.handleChange}
                                />
                            </Label>
                        </div>
                        <div>
                            <Label>Insert your friend's webID:
                                <Input
                                    type="text"
                                    name="friendWebID"
                                    value={friendWebID}
                                    onChange={this.handleChange}
                                />
                            </Label>
                        </div>
                        <button type="submit">Send</button>
                    </form>
                </div>
            </ShareWrapper>
        )
    }
}

export default CreateShareRoute;