import Route from '../../../entities/Route.js';
import React, {Component} from "react";
import {space, schema} from 'rdf-namespaces';
import {fetchDocument} from 'tripledoc';
import {RoutesView} from "../../../containers/RoutesView/RoutesView";
import Point from "../../../entities/Point.js"
import auth from "solid-auth-client";
import FC from 'solid-file-client';

export class Rutas extends Component<Props> {

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
        const fc = new FC(auth);
        const {webId} = this.props;


        const profileDocument = await fetchDocument(webId);
        const profile = profileDocument.getSubject(webId);

        // Get the root URL of the user's Pod:
        const storage = profile.getRef(space.storage);

        let folder;
        await fc.readFolder(storage + 'public/viade/routes').then((content) => {
            folder = content;
        }).catch(err => folder = null);

        var rutas = [];

        if (folder) {
            for (let i = 0; i < folder.files.length; i++) {
                console.log("FICHERO ACTUAL: " + folder.files[i].url);
                let routeDocument;

                await fetchDocument(folder.files[i].url).then((content) => {
                    routeDocument = content;
                }).catch(err => routeDocument = null);

                console.log(routeDocument);

                if (routeDocument != null) {
                    const route = routeDocument.getSubject("http://example.org/myRoute");
                    const points = route.getAllLocalSubjects('http://arquisoft.github.io/viadeSpec/point');

                    console.log(route.getString(schema.name));
                    //Provisional cause we dont really know how to obtain the points from the schema

                    let pointsArray = [];
                    //points.forEach(point => pointsArray.push(new Point(points[i].getDecimal(schema.latitude), points[point-get].getDecimal(schema.longitude))));
                    for (let j = 0; j < points.length; j++){
                        pointsArray.push(new Point(points[j].getDecimal(schema.latitude), points[j].getDecimal(schema.longitude)));
                    }

                    let ruta = new Route(route.getString(schema.name), pointsArray, route.getString(schema.description));
                    console.log("UUID RUTA: " + ruta.uuid);

                    rutas.push(ruta);
                }
            }
        }
        this.setState({rutas});
    };

    render() {
        const {rutas} = this.state;

        return (
            <RoutesView {...{rutas}} />
        );
    }
}