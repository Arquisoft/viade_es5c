import React,{useState,useCallback} from "react";
import {ShareWrapper, Input, Label} from "./shareroutes.style";
import { NotificationTypes } from "@inrupt/solid-react-components";
import { notification} from "../../utils";
import {useNotification} from '@inrupt/solid-react-components';

const CreateShareRoute =(props)=> {

    const [friend, setFriend] = useState('');
    const[route,setRoute]=useState('');
      const {webId}=props;
    const { createNotification} = useNotification(webId);
  
      const sendNotification=useCallback(
        async (content, to, type, license) => {
          try {
            await createNotification(content, to, type, license);
          } catch (error) {
            alert('Error: ShareComponent > sendNotification');
          }
        },
        [  createNotification]
      );
    async function compartirRuta(){
        const licenseUrl = "https://creativecommons.org/licenses/by-sa/4.0/";
            const inboxes = await notification.findUserInboxes([
                { path: friend, name: "Global" }
            ]);

            const to = inboxes[0];
            const target = friend;

            await sendNotification(
                {
                    title: "Route share",
                    summary: "has shared you a route.",
                    actor: webId,
                    object: route,
                    target
                },
                to.path,
                NotificationTypes.OFFER,
                licenseUrl
            );
    }
    const handleSubmit = e => {
        e.preventDefault();
        compartirRuta();
    };

        return (
            <ShareWrapper>
                <form onSubmit={handleSubmit}>
                    <Label>
                        Route's webID:
                        <Input
                            type="text"
                            name="route"
                        />
                    </Label>
                    <Label>
                        Insert your friend's webID:
                        <Input
                            type="text"
                            name="friend"
                        />
                    </Label>
                    <Input type="submit" value="Submit"/>
                </form>
            </ShareWrapper>
        );
    
}

export default CreateShareRoute