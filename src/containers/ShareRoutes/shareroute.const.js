import React, {useCallback} from "react";
import {CreateShareRoute} from "./children";
import {useNotification} from '@inrupt/solid-react-components';

const ShareRoute = (props) => {
    const {webId} = props;
    const {createNotification} = useNotification(webId);

    const sendNotification = useCallback(
        async (content, to, type, license) => {
            try {
                await createNotification(content, to, type, license);
            } catch (error) {
                console.log(error);
                alert('Error: RouteConst > sendNotification');
            }
        },
        [createNotification]
    );

    return (
        <div>
            <CreateShareRoute sendNot={sendNotification}></CreateShareRoute>
        </div>
    );

}

export default ShareRoute;