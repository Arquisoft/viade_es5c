import React,{useState,useCallback} from "react";
import {ShareWrapper, Input, Label} from "./shareroutes.style";
import data from '@solid/query-ldflex';
import { ShareRoutesPageContent } from './shareroutes.component';
import auth from 'solid-auth-client';
import FC from 'solid-file-client';
import { namedNode } from '@rdfjs/data-model';
import { withTranslation } from "react-i18next";

type Props = {webId: String};

class CreateShareRoute extends React.Component {
    constructor ({webId}: Props) {
        super();
        this.webID = webId.replace("profile/card#me", "");
        this.state = {
            routeWebID: '',
            friendWebID: ''
        }
        this.fc = new FC(auth);
    }

    async shareRoute(){
        try{
            var session = await auth.currentSession();
            console.log("session " + session);
            var targetUrl = this.state.friendWebID + "inbox/"; //mirar si tenemos acceso
            console.log(targetUrl);
            await this.sendMessage(this, session,targetUrl);

        }catch(error) {
            console.log(error);
            alert("Could not share the route");
        }
    }

    async sendMessage(app, session,targetUrl){
        var message = {};
        message.date = new Date(Date.now());

        message.id = message.date.getTime();

        message.sender = session.webId;
        console.log("sender was " + message.sender);

        message.recipient = targetUrl;
        console.log("recipient was " + message.recipient);

        var baseSource = session.webId.split("profile/card#me")[0];
        console.log("baseSourse " + baseSource);
        var source = baseSource + "public/routes/";
        console.log("sourse " + source);
        message.content =this.state.routeWebID;
        console.log("message.content " + message.content);

        message.title = "Shared route by " + await app.getSessionName();
        console.log("message.title " +  message.title);

        message.url = message.recipient + message.id + ".ttl";
        console.log("message.url " + message.url);

        console.log("sessionWEID " + session.webId);
        await app.buildMessage(session, message);
    }

    async buildMessage(session, message){
        var mess = message.url;
        console.log("mess " + mess);
        await data[mess].schema$text.add(message.content);
        console.log("hice el 1");
        await data[mess].rdfs$label.add(message.title);
        console.log("hice el 2");
        await data[mess].schema$dateSent.add(message.date.toISOString());
        console.log("hice el 3");
        await data[mess].rdf$type.add(namedNode('https://schema.org/Message'));
        console.log("hice el 4");
        await data[mess].schema$sender.add(namedNode(session.webId));
        console.log("hice el 5");
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const values = JSON.stringify(this.state)
        console.log(this.state.routeWebID + " " + this.state.friendWebID);
        this.shareRoute();
    }

    async getSessionName(){
        var session = await auth.currentSession();
        var tmp = session.webId.split(".")[0];
        return tmp.split("//")[1];
    }

    getRouteNameNoExtension(){
        var tmp = window.location.href.split("=")[1];
        return tmp.substring(tmp.lastIndexOf('/') + 1);
    }

    getRouteName(){
        console.log("message.contente " + this.state.routeWebID.split("/")[6]);
        return this.state.routeWebID.split("/")[6];
    }

    async getRoute(){
        var name = this.getRouteName();
        var session = await auth.currentSession();
        var url = session.webId.split("profile/card#me")[0] + "routes/";
        console.log(url);
        var file = await this.fc.readFile(url + name);
        if (file != null){
            this.setState({route: file});
        }
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