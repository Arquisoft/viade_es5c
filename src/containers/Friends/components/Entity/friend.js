import React from 'react';

export const Friend = propos =>{
    const {friend} = propos;

    return(
        <li key = {friend.webId}> {friend.name} <img width="20%" src={friend.image} alt={"prueba"}/></li>
    );
};