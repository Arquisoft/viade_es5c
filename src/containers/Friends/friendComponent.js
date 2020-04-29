import React from "react";
import {FriendCard, FriendContainer, FriendDetail, FriendWrapper, Header} from './friend.style';
import {Friend} from "./components/Entity/friend";
import {useTranslation} from "react-i18next";

export const FriendPage = props => {
    const {t} = useTranslation();
    const {friends} = props;

    return (
        <FriendWrapper>
            <FriendContainer>
                <Header>
                    <h1 className="text--white"> {t('navBar.friends')} </h1>
                </Header>
                {friends.map(friend => (
                    <FriendCard className="card">
                        <FriendDetail data-testid="welcome-detail">
                            <table>
                                <Friend friend={friend}/>
                            </table>
                        </FriendDetail>
                    </FriendCard>))}
            </FriendContainer>
        </FriendWrapper>);
};