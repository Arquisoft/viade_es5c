import React, {Component} from "react";
import {ShareWrapper} from "../ShareRoutes/shareroutes.style";
import {H1, Header} from "./friendroute.style";
import i18n from '../../i18n';
import Button from "react-bootstrap/Button";

const FriendRoute = (props) => {
        const { friends, see } = props;
        function seeRoutes(friend){
            see.getRoutesSharedWithMe(friend);
        }
        return (
            <ShareWrapper>
                <Header>
                    <H1>{i18n.t('friendRoutes.title')}</H1>
                </Header>
                <body>
                {friends.map((friend) => (<Button onClick={seeRoutes.bind(this, friend.webId)} key={friend.webId}>{friend.name}</Button>))}
                </body>
            </ShareWrapper>
        );

};

export default FriendRoute;