import {Header, RouteContainer, RouteWrapper} from "./routesView.style";
import RouteView from "./children/RouteView";
import SolidAuth from "solid-auth-client";
import { successToaster, errorToaster } from '@utils';
import React, { useState } from 'react';

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

function handleLoad(event) {
    const [text, setText] = useState('');
    event.preventDefault();
    const doc = SolidAuth.fetch('');
    doc
        .then(async response => {
            const text = await response.text();
            if (response.ok) {
                setText(text);
            } else if (response.status === 404) {
                successToaster('notifications.404');
            } else {
                errorToaster('notifications.errorLoading');
            }

        })
        .catch(() => {
            errorToaster('notifications.errorFetching');
        });
}

export default RoutesView;