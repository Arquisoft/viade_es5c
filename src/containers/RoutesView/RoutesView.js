import {Header, RouteContainer, RouteWrapper} from "./routesView.style";
import {RouteView} from "./children/RouteView";
import React from 'react';
import {useTranslation} from "react-i18next";


export const RoutesView = props => {
    const {t} = useTranslation();
    const {rutas, friends} = props;

    return (
        <RouteWrapper>
            <RouteContainer>
                <Header>
                    <h1>{t('navBar.routes')}</h1>
                </Header>
                {rutas.map(ruta => <RouteView ruta={ruta}/>)}
                <div id="map"></div>
            </RouteContainer>
        </RouteWrapper>

    );
};