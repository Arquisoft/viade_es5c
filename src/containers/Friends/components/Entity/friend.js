import React from 'react';

export const Friend = propos => {
    const {friend} = propos;

    return (
        <tr key={friend.webId}>
            <td>{friend.name} </td>
        </tr>
    );
};