import React from 'react';
import {Header, RouteContainer, RouteWrapper} from "./routesView.style";
import RouteView from "./children/RouteView";

function RoutesView() {
    return (
        <RouteWrapper>
            <RouteContainer>
                <Header>
                    <h1 className = "text--white">Rutas</h1>
                </Header>

                <RouteView
                title = "Prueba"
                date = "18/08/2018"
                author = "Elmer"
                description = "Ruta de montaña"
                />

                <RouteView
                    title = "Prueba"
                    date = "18/08/2018"
                    author = "Elmer"
                    description = "Ruta de montaña"
                />
            </RouteContainer>
        </RouteWrapper>
    );
}

export default RoutesView;