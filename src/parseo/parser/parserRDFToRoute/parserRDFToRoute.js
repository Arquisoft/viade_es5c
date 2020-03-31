import Route from '../../../entities/Route.js';
import React, {Component} from "react";
import {space, schema} from 'rdf-namespaces';
import {fetchDocument} from 'tripledoc';
import {RoutesView} from "../../../containers/RoutesView/RoutesView";
import Point from "../../../entities/Point.js"
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
        await fc.readFolder(storage + 'public/viade/routes').then((content) => {
            folder = content;
        }).catch(err => folder = null);

        var result = [];
        console.log("Folder"+ folder);
        if (folder) {
            for (let i = 0; i < folder.files.length; i++) {
                let routeDocument;

                await fetchDocument(folder.files[i].url).then((content) => {
                    routeDocument = content;
                }).catch(err => routeDocument = null);
                console.log("RD"+ routeDocument);


                if (routeDocument != null) {
                    const route = routeDocument.getSubject('#myRoute');
                    let puntos = routeDocument.getSubjectsOfType('http://arquisoft.github.io/viadeSpec/point');
                    console.log("RUTISA:");
                    console.log(route);
                    console.log("RUTISA _NAME:");
                    console.log(route.getString('http://xmlns.com/foaf/0.1/name'));


                   //Provisional cause we dont really know how to obtain the points from the schema
                    let points = [];
                    for(i=0;i<puntos;i++)
                        points.push(new Point(puntos.getDecimal(schema.latitude),puntos.getDecimal(schema.longitude)));

                    let ruta = new Route(route.getString('http://xmlns.com/foaf/0.1/name'), route.getString(schema.description));
                    console.log("RUTISA FORMED:");
                    console.log(ruta);
                    result = [...result, ruta];
                }
            }
            this.state.rutas = result;
        }
    };

    render() {
        const {rutas} = this.state;
        return (
            <RoutesView {...{rutas}} />
        );
    }
}