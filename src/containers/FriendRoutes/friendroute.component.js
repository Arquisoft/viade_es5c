import React, {Component} from "react";
import {ShareWrapper} from "../ShareRoutes/shareroutes.style";
import {H1, Header} from "./friendroute.style";
import i18n from '../../i18n';

const FriendRoute = (props) => {
        const { friends } = props;
        console.log(friends)
        return (
            <ShareWrapper>
                <Header>
                    <H1>{i18n.t('friendRoutes.title')}</H1>
                </Header>
                <p>{friends}</p>
            </ShareWrapper>
        );

};

export default FriendRoute;