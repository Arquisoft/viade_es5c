import React from 'react';
import {RouteCard, RouteDetail} from "./timelineroute.style";

export const RouteView = props =>{
    const {ruta} = props;

    return(
        <RouteCard className="card">
            <RouteDetail data-testid="welcome-detail">
                <p key = {ruta.name}>{ruta.name}</p>
            </RouteDetail>
        </RouteCard>
    );
};