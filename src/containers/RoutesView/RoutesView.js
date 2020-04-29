import {Header, RouteContainer, RouteWrapper} from "./routesView.style";
import {RouteView} from "./children/RouteView";
import React, {useCallback} from 'react';
import {useTranslation} from "react-i18next";
import {useNotification} from '@inrupt/solid-react-components';

export const RoutesView = props => {
    const {t} = useTranslation();
    const {rutas, friends} = props;
    const {webId} = props;
    const {createNotification} = useNotification(webId);

    const sendNotification = useCallback(
        async (content, to, type, license) => {
            try {
                await createNotification(content, to, type, license);
            } catch (error) {
                console.log(error);
                alert('Error: RouteConst > sendNotification');
            }
        },
        [createNotification]
    );

    return (
        <RouteWrapper>
            <RouteContainer>
                <Header>
                    <h1>{t('navBar.routes')}</h1>
                </Header>
                <div>
                    {rutas.map(ruta => <RouteView data={{ruta, friends}} sendNot={{sendNotification}}/>)}
                    <div id="map"></div>
                </div>
            </RouteContainer>
        </RouteWrapper>
    );
};