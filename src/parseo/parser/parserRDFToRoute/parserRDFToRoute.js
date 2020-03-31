import Route from '../../../entities/Route.js';
import React, {Component} from "react";
import {space, schema} from 'rdf-namespaces';
import {fetchDocument} from 'tripledoc';
import {RoutesView} from "../../../containers/RoutesView/RoutesView";

const auth = require('solid-auth-client');
const FC = require('solid-file-client');
const fc = new FC(auth);

export  class Rutas extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            rutas: []
        };
    }

    componentDidMount() {
        const {webId} = this.props;
        if (webId) this.listRoutes();
    }

    componentDidUpdate(prevProps) {
        const {webId} = this.props;
        if (webId && webId !== prevProps.webId) this.listRoutes();
    }

    listRoutes = async () => {
        const {webId} = this.props;
        console.log(webId);

        const profileDocument = await fetchDocument(webId);
        const profile = profileDocument.getSubject(webId);

        // Get the root URL of the user's Pod:
        const storage = profile.getRef(space.storage);

        let folder;
        fc.readFolder(storage + 'public/viade/routes/otro').then((content) => {
            folder = content;
        }).catch(err => folder = null);

        var result = [];

        if (folder) {
            for (let i = 0; i < folder.files.length; i++) {
                let routeDocument;

                await fetchDocument(folder.files[i].url).then((content) => {
                    routeDocument = content;
                }).catch(err => routeDocument = null);

                if (routeDocument != null) {
                    const route = routeDocument.getSubject('#myRoute');
                    let puntos = routeDocument.getSubjectsOfType('http://arquisoft.github.io/viadeSpec/points');
                    console.log("RUTISA:" + route);
                    let ruta = new Route(route.getString(schema.name), [puntos[0].getDecimal(schema.latitude), puntos[0].getDecimal(schema.longitude)], route.getString(schema.description));
                    console.log("RUTISA2er43345453:" + ruta);
                    result = [...result, ruta];
                }
            }
            this.state.rutas = result;
        }
    }

    render() {
        const {rutas} = this.state;
        //console.log(rutas);
        return (
            <RoutesView {...{rutas}} />
        );
    }
}