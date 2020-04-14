import React from 'react';
import {RouteCard, RouteDetail} from "./timelineroute.style";
import RouteVisualizer from "../../../components/RouteVisualizer/RouteVisualizer.component";
import ReactDOM from "react-dom";
import {RouteContainer} from "../routesView.style";

export const RouteView = props => {
    const {ruta} = props;

    function vivapiñata() {
        const domContainer = document.querySelector('#map');
        ReactDOM.render(<RouteVisualizer ruta= {ruta}></RouteVisualizer>, domContainer);
    }

    return (
        <RouteCard className="card" onClick={vivapiñata}>
            <RouteDetail data-testid="welcome-detail">
                <p key={ruta.name}>{ruta.name}</p>
                <div id="map"></div>
            </RouteDetail>
        </RouteCard>

    );
};