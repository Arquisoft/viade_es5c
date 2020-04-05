import React, {Component} from "react";
import {space, schema} from 'rdf-namespaces';
import {fetchDocument} from 'tripledoc';
import {RoutesView} from './RoutesView';
import Point from '../../entities/Point';
import Route from '../../entities/Route';
import auth from "solid-auth-client";
import FC from 'solid-file-client';

export class RoutesList extends Component<Props> {

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
        const storage = profile.getRef(space.storage);

        let folder;
        await fc.readFolder(storage + 'public/viade/routes').then((content) => {
            folder = content;
        }).catch(err => folder = null);

        let rutas = [];

        if (folder) {
            for (let i = 0; i < folder.files.length; i++) {
                let routeDocument;

                await fetchDocument(folder.files[i].url).then((content) => {
                    routeDocument = content;
                }).catch(err => routeDocument = null);

                if (routeDocument != null) {
                    const route = routeDocument.getSubject("http://example.org/myRoute");
                    const points = route.getAllLocalSubjects('http://arquisoft.github.io/viadeSpec/point');

                    let pointsArray = [];
                    points.forEach(point =>
                        pointsArray.push(new Point(point.getDecimal(schema.latitude), point.getDecimal(schema.longitude))));

                    if (route.getString(schema.name) !== null)
                        rutas.push(new Route(route.getString(schema.name), pointsArray, route.getString(schema.description)));
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