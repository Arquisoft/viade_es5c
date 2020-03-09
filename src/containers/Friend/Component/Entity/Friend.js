import React, { Component } from 'react';

export const Friend = props => {
    const { friend } = props;

    return (
        <li key={friend.webId}>{friend.name}<img width="100px" src={friend.image}/></li>
    );
}