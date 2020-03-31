import React,{useState,useCallback} from "react";
import {ShareWrapper, Input, Label} from "./shareroutes.style";
import auth from 'solid-auth-client';
import data from '@solid/query-ldflex';
import FC from 'solid-file-client';
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

    async shareRoute(friend){
        const { t } = this.props;

        try{
            var session = await auth.currentSession();
            //var targetUrl = friend.webId.split("profile/card#me")[0] + "inbox/";
            var targetUrl = this.state.friendWebID + "inbox/"; //mirar si tenemos acceso
            const {createNotification} =useNotification(webId);
            const licenseUrl = "";
            const inboxes = "" //lo sacado con lo de lucia

            const target = friendWebId;
            await sendNotification(createNotification,{
            {
                title: "Route share",
                    summary: "has shared you a route.",
                actor: webId,
                object: route,
                target: friendWebId
            },
            inboxes.path,
                NotificationTypes.OFFER,
                licenseUrl
        });
            await this.sendMessage(this, session, targetUrl);
            document.getElementById("btn"+friend.webId).innerHTML = t("routes.shared");
            document.getElementById("btn"+friend.webId).disabled = true;
        }catch(error) {
            console.log(error);
            alert("Could not share the route");
        }

    }
    async sendNotification(createNotification,content,to,type,license){
        try{
            await createNotification(content,to,type,license);
        }catch(error){
            alert('Error sendnotification');
        }
    }

    async sendMessage(app, session, targetUrl){
        var message = {};
        message.date = new Date(Date.now());
        message.id = message.date.getTime();
        message.sender = this.webId;
        message.recipient = targetUrl;

        var baseSource = session.webId.split("profile/card#me")[0];
        var source = baseSource + "public/routes/";
        message.content = source + app.getRouteName();
        message.title = "Shared route by " + await app.getSessionName();
        message.url = message.recipient + message.id + ".ttl";

        await app.buildMessage(session, message);
    }

    async buildMessage(session, message){
        var mess = message.url;
        await data[mess].schema$text.add(message.content);
        await data[mess].rdfs$label.add(message.title);
        await data[mess].schema$dateSent.add(message.date.toISOString());
        await data[mess].rdf$type.add(namedNode('https://schema.org/Message'));
        await data[mess].schema$sender.add(namedNode(session.webId));
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