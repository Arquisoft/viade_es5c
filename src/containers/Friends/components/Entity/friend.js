import React from 'react';

export const Friend = propos =>{
    const {friend} = propos;

    return(
        <li key = {friend.webId}> {friend.name} <img src={friend.image}/></li>
    );
};