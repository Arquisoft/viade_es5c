import React from "react";
import {
    FriendWrapper,
    FriendList, FriendContainer
} from './friend.style';
import {Friend} from "./components/Entity/friend";

export const FriendPage = propos => {
    const {friends} = propos;

    return (<FriendWrapper>
        <FriendContainer className = "card">
            <h1></h1>
            <ul>
                {friends.map(friend => (<Friend friend={friend}/>))}
            </ul>
        </FriendContainer>
    </FriendWrapper>);
};