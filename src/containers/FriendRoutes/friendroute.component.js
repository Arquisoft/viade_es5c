import React from 'react';
import {ShareWrapper, ShareContainer} from "../ShareRoutes/shareroutes.style";
import {H1, Header} from "./friendroute.style";
import i18n from '../../i18n';
import Button from "react-bootstrap/Button";
import {RouteView} from "./children/RouteView";
import {ComboBox} from "@progress/kendo-react-dropdowns";

const FriendRoute = (props) => {
    const {friends, routes, see} = props;
    
    
    function seeRoutes(friend) {
        see.getRoutesSharedWithMe(friend);
    }

    return (

        <ShareWrapper>
            <ShareContainer>
            <Header>
                <H1>{i18n.t('friendRoutes.title')}</H1>
            </Header>
            <div>
                {friends.map((friend) => (
                    <p><Button onClick={seeRoutes.bind(this, friend.webId)} key={friend.webId}>{friend.name}</Button>
                    </p>))}
                <h2>Rutas:</h2>
                {routes.map(ruta => <RouteView data={{ruta}}/>)}
                <div id="map"></div>
            </div>
            </ShareContainer>
        </ShareWrapper>

    );

};

export default FriendRoute;