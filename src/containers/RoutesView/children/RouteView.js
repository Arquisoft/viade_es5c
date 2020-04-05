import React from 'react';

export const RouteView = props => {
    const {ruta} = props;

    return (
        <p>{ruta.uuid}{ruta.name}</p>
    );
};