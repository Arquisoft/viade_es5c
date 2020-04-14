import {Header, RouteContainer, RouteWrapper} from "./routesView.style";
import {RouteView} from "./children/RouteView";
import React from 'react';
export const RoutesView = props => {
    const {rutas} = props;

    return (
        <RouteWrapper>
            <RouteContainer>
                <Header>
                    <h1 className = "text--white">Rutas</h1>
                </Header>
                    {rutas.map(ruta => <RouteView ruta={ruta}/>)}

            </RouteContainer>
        </RouteWrapper>
    );
};