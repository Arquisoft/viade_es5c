import {Header, RouteContainer, RouteWrapper} from "./routesView.style";
import {RouteView} from "./children/RouteView";
import React from 'react';
import {useTranslation} from "react-i18next";
import {RouteCard, RouteDetail} from "./children/timelineroute.style";

export const RoutesView = props => {
    const {t} = useTranslation();
    const {rutas} = props;

    return (
        <RouteWrapper>
            <RouteContainer>
                <Header>
                    <h1>{t('navBar.routes')}</h1>
                </Header>
                {rutas.map(ruta =>
                    <RouteCard className="card" key={ruta.uuid}>
                        <RouteDetail data-testid="welcome-detail">
                            <p>{ruta.name}</p>
                        </RouteDetail>
                    </RouteCard>
                )}
            </RouteContainer>
        </RouteWrapper>
    );
};