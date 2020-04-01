import React from 'react';
import ReactDOM from 'react';
import {RouteCard, RouteDetail} from "./timelineroute.style";
import CreateMap from "../../../components/MapCreate/Map";

export const RouteView = props => {
    const {ruta} = props;
    var isToggleOn = false;
    const showMap = () => {
        isToggleOn = true;
        ReactDOM.render(
            <CreateMap parentCallback={ruta}/>,
            document.getElementById('root')
        );
    };
    return (
        <RouteCard className="card" onclick={showMap}>
            <RouteDetail data-testid="welcome-detail">
                <p key={ruta.name}>{ruta.name}</p>
            </RouteDetail>

        </RouteCard>
    );
};