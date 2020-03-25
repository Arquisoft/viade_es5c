import React from "react";
import {
    FriendWrapper,
    FriendContainer,
    FriendCard,
    FriendDetail
} from './friend.style';
import {Friend} from "./components/Entity/friend";
import {useTranslation} from "react-i18next";

export const FriendPage = propos => {
    const {t} = useTranslation();
    const {friends} = propos;

    return (
        <FriendWrapper>
            <FriendContainer className="card">
                <header>
                    <h>{t('navBar.friends')}</h>
                </header>
                {friends.map(friend => (
                    <FriendCard className="card">
                        <FriendDetail data-testid="welcome-detail">
                            <Friend friend={friend}/>
                        </FriendDetail>
                    </FriendCard>))}

            </FriendContainer>
        </FriendWrapper>);
};