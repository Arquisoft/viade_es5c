import React from 'react';

export const Friend = propos => {
    const {friend} = propos;
    const {t} = useTranslation();
    return (
        <tr key={friend.webId}>
            <td>{friend.name} </td>
            <td><a href={friend.webId}>{t('friends.profile')} {friend.name}</a> </td>
        </tr>
    );
};