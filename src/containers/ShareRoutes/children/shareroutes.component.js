import React from "react";
import {ShareWrapper} from "../shareroutes.style";
import auth from 'solid-auth-client';
import FC from 'solid-file-client';
import {ShareRouteService} from "../Service";
import { NotificationTypes } from '@inrupt/solid-react-components';
import {Button, H1, H2, Header, Input, LABEL} from "../../FriendRoutes/friendroute.style";

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
            console.log(await ShareRouteService.publish(this.props.sendNot,this.props.discoverIn, contentNotif, this.state.friendWebID,NotificationTypes.OFFER));
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



    render(){
        const { routeWebID, friendWebID } = this.state
        return (
            <ShareWrapper>
                <Header> <H1>Insert the following webID's to share the route</H1> </Header>
                    <form onSubmit={this.handleSubmit}>
                        <div>

                            <LABEL>
                                <H2>Route's webID:</H2>
                                <Input type="text" name="routeWebID" value={routeWebID} onChange={this.handleChange}/>
                            </LABEL>
                        </div>
                        <div>
                            <LABEL>
                                <H2>Insert your friend's webID:</H2>
                                <Input type="text" name="friendWebID" value={friendWebID} onChange={this.handleChange}/>
                            </LABEL>
                        </div>
                        <Button type="submit">Send</Button>
                    </form>

            </ShareWrapper>
        );
    }
}

export default CreateShareRoute;