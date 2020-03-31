import React,{useState,useCallback} from "react";
import {ShareWrapper, Input, Label} from "./shareroutes.style";
import {useNotification} from '@inrupt/solid-react-components';

type Props = {webId: String};

class CreateShareRoute extends React.Component {
    constructor ({webId}: Props) {
        super();
        this.webID = webId.replace("profile/card#me", "");
        console.log(this.webID);
        this.createNotification = useNotification(webId);
        this.state = {
            routeWebID: '',
            friendWebID: ''
        }
    }


    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const values = JSON.stringify(this.state)
        console.log(this.state.routeWebID + " " + this.state.friendWebID);
    }

    render () {
        const { routeWebID, friendWebID } = this.state

        return (
            <ShareWrapper>
                <div>
                    <h1>Insert the following webID's to share the route</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label>Route's webID:
                                <input
                                    type="text"
                                    name="routeWebID"
                                    value={routeWebID}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label>Insert your friend's webID:
                                <input
                                    type="text"
                                    name="friendWebID"
                                    value={friendWebID}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>
                        <button type="submit">Send</button>
                    </form>

                    <div>
                        <h2>Values of the form</h2>
                        <p>{JSON.stringify(this.state)}</p>
                    </div>
                </div>
            </ShareWrapper>
        )
    }
}
export default CreateShareRoute