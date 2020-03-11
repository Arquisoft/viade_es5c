import React from "react";
import {
    FriendContainer,
    FriendList
} from './friend.style';
import {Friend} from "./components/Entity/friend";

export const FriendPage = propos => {
    const {friends} = propos;

    return (<FriendContainer>
        <FriendList>
            <ul>
                {friends.map(friend => (<Friend friend={friend}/>))}
            </ul>
        </FriendList>
    </FriendContainer>);
};