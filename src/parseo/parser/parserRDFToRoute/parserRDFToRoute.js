import Route from '../../../entities/Route.js';
import React, {Component} from "react";
import {space, schema} from 'rdf-namespaces';
import {fetchDocument} from 'tripledoc';
import {RoutesView} from "../../../containers/RoutesView/RoutesView";

const auth = require('solid-auth-client');
const FC = require('solid-file-client');
const fc = new FC(auth);

export class Rutas extends Component<Props>{

    constructor(props) {
        super(props);

        this.state = {
            rutas: []
        };
    }

    async listRoutes() {
        let session = auth.currentSession();

        if (!session)
            window.location.href = "/login";

        const profileDocument = await fetchDocument(session.webId);
        const profile = profileDocument.getSubject(session.webId);

        // Get the root URL of the user's Pod:
        const storage = profile.getRef(space.storage);

        let folder;

        await fc.readFolder(storage + 'rutas/').then((content) => {
            folder = content;
        }).catch(err => folder = null);

        var result = [];

        if (folder) {
            for (let i = 0; i < folder.files.length; i++) {
                console.log(folder.files[i].url);
                let routeDocument;
                await fetchDocument(folder.files[i].url).then((content) => {
                    routeDocument = content;
                })
                    .catch(err => routeDocument = null);

                if (routeDocument != null) {
                    const route = routeDocument.getSubject('#ruta');
                    let puntos = routeDocument.getSubjectsOfType('http://arquisoft.github.io/viadeSpec/points');

                    let ruta = new Route(route.getString(schema.name), [puntos[0].getDecimal(schema.latitude), puntos[0].getDecimal(schema.longitude)], route.getString(schema.description));

                    //for(var e in puntos) {
                    // if (e !== 0) {
                    // ruta.addHito(new Hito(puntos[e].getString(schema.name), puntos[e].getDecimal(schema.latitude), puntos[e].getDecimal(schema.longitude)));
                    //}
                    //}

                    result = [...result, ruta];
                }
            }
            this.state.rutas = result;
        }
    }

    render() {
        const { rutas } = this.state;
        console.log(rutas);
        return (
            <RoutesView {...{ rutas}} />
        );
    }
}
