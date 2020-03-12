import React from 'react';
import {RouteCard, RouteDetail} from "./timelineroute.style";

const RouteView = props =>{
    const {title, date, author, description} = props;
    return(
        <RouteCard className="card">
            <RouteDetail data-testid="welcome-detail">
                <h3>{title}</h3>
                <h4>{date} </h4>
                <p>{description}</p>
            </RouteDetail>
        </RouteCard>
    );
}

export default RouteView;