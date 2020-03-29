import React from 'react';
import {Image} from '../../friend.style'

export const Friend = propos =>{
    const {friend} = propos;

    return(
        <li key = {friend.webId}> {friend.name} <Image> <img src={friend.image} alt={"imagen"}/></Image></li>
    );
};