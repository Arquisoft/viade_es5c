import React from 'react';
import {Image} from '../../friend.style'

export const Friend = propos =>{
    const {friend} = propos;

    return(
        <tr key = {friend.webId}> <td>{friend.name} </td><td><Image> <img src={friend.image} alt={"imagen"}/></Image></td></tr>
    );
};