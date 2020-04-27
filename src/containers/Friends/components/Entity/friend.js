import React from 'react';
import {Image} from '../../friend.style'
//import {useTranslation} from "react-i18next";

export const Friend = propos => {
    const {friend} = propos;
    //const {t} = useTranslation();
    return (<tr key={friend.webId}>
        <td><Image> <img src={friend.image} alt={"imagen"}/></Image></td>
        <td><a href={friend.webId}>{friend.name}</a></td>
    </tr>);
};