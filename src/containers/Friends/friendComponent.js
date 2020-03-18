import React from "react";
import {
    FriendWrapper,
    FriendList, FriendContainer
} from './friend.style';
import {Friend} from "./components/Entity/friend";
import {useTranslation} from "react-i18next";
const { t } = useTranslation();
export const FriendPage = propos => {
    const {friends} = propos;

    return (<FriendWrapper>
        <FriendContainer className = "card">
            <h1>t('navBar.friends')</h1>
            <ul>
                {friends.map(friend => (<Friend friend={friend}/>))}
            </ul>
        </FriendContainer>
    </FriendWrapper>);
};