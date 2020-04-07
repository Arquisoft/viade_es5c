import React from 'react';
import {Image} from '../../friend.style'

export const Friend = propos => {
    const {friend} = propos;

    //<p><Image> <img src={friend.image} alt={"imagen"}/></Image></p> la puta foto

    return (
        <ul key={friend.webId}>
            <li> {friend.name}</li>
        </ul>
    );
};