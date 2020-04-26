import React, {Component} from "react";
import {schema, space} from 'rdf-namespaces';
import {fetchDocument} from 'tripledoc';
import {RoutesView} from './RoutesView';
import Point from '../../entities/Point';
import Route from '../../entities/Route';
import auth from "solid-auth-client";
import FC from 'solid-file-client';
import data from '@solid/query-ldflex';
import Media from "../../entities/Media";
import Service from '../Friends/Service/Service';

export class RoutesList extends Component <Props> {

    constructor(props) {
        super(props);

        this.state = {
            rutas: [],
            friends: []
        };
    }

    componentDidMount() {
        const {webId} = this.props;
        if (webId) this.listRoutes();
    }

    componentDidUpdate(prevProps) {
        const {webId} = this.props;
        if (webId && webId !== prevProps.webId) {
            this.listRoutes();
        }
    }

    listRoutes = async () => {
        const fc = new FC(auth);
        const {webId} = this.props;
        const profileDocument = await fetchDocument(webId);
        const profile = profileDocument.getSubject(webId);
        const storage = profile.getRef(space.storage);

        let friends = await Service.getFriends();

        let folder;
        await fc.readFolder(storage + 'viade2Prueba1/routes').then((content) => {
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

                    const refs = route.getAllRefs('http://arquisoft.github.io/viadeSpec/hasMediaAttached');
                    var medias = [];

                    if (refs.length > 0) {
                        for (let i = 0; i < refs.length; i++) {
                            let ref = routeDocument.getSubject(refs[i]);

                            let fechaMedia = ref.getDateTime(schema.publishedDate);
                            let autor = data[ref.getRef(schema.author)];
                            let image = ref.getRef(schema.contentUrl);

                            medias.push(new Media(ref, autor, fechaMedia, image));
                        }
                    }

                    let pointsArray = [];
                    points.forEach(point =>
                        pointsArray.push(new Point(point.getDecimal(schema.latitude), point.getDecimal(schema.longitude))));

                    if (route.getString(schema.name) !== null) {
                        let ruta = new Route(route.getString(schema.name), pointsArray, route.getString(schema.description));
                        ruta.setMedia(medias);
                        rutas.push(ruta);
                    }
                }
            }
        }
        this.setState({rutas:rutas, friends:friends});
    };

    render() {
        const {rutas, friends} = this.state;

        return (<
                RoutesView {...{rutas, friends}}
            />
        );
    }
}