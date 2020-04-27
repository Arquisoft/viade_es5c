import React from 'react';
import {ShareWrapper, ShareContainer} from "../ShareRoutes/shareroutes.style";
import {Header} from "./friendroute.style";
import i18n from '../../i18n';
import Button from "react-bootstrap/Button";
import {RouteView} from "./children/RouteView";
import {RouteCard} from "../RoutesView/children/timelineroute.style";

const FriendRoute = (props) => {
    const {friends, routes, see} = props;

    function seeRoutes(friend) {
        see.getRoutesSharedWithMe(friend);
    }

    return (
        <ShareWrapper>
            <ShareContainer>
            <Header>
                <h1 style={{color: "white"}}>{i18n.t('friendRoutes.title')}</h1>
            </Header>
            <div>
                {friends.map((friend) => (
                    <p><Button onClick={seeRoutes.bind(this, friend.webId)} key={friend.webId}>{friend.name}</Button>
                    </p>))}
                <h2>{i18n.t('friendRoutes.routes')}:</h2>
                <RouteCard>
                    {routes.map(ruta => <RouteView data={{ruta}}/>)}
                    <div id="map"></div>
                </RouteCard>
            </div>
            </ShareContainer>
        </ShareWrapper>

    );

};

export default FriendRoute;