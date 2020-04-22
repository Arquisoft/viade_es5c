import React, {Component} from "react";
import {ShareWrapper} from "../ShareRoutes/shareroutes.style";
import {H1, Header} from "./friendroute.style";
import i18n from '../../i18n';
import Button from "react-bootstrap/Button";
import RouteVisualizer from "../../components/RouteVisualizer/RouteVisualizer.component";
import Popup from "reactjs-popup";
import {RouteView} from "../RoutesView/children/RouteView";

const FriendRoute = (props) => {
    const {friends, routes, see} = props;

    function seeRoutes(friend) {
        see.getRoutesSharedWithMe(friend);
    }

    return (
        <ShareWrapper>
            <Header>
                <H1>{i18n.t('friendRoutes.title')}</H1>
            </Header>
            <div>
                {friends.map((friend) => (
                    <p><Button onClick={seeRoutes.bind(this, friend.webId)} key={friend.webId}>{friend.name}</Button>
                    </p>))}
                <h2>Rutas:</h2>
                {routes.map(ruta => <RouteView ruta={ruta}/>)}
                <div id="map"></div>
            </div>


        </ShareWrapper>
    );

};

export default FriendRoute;