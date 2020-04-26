import React, {Component} from "react";
import data from "@solid/query-ldflex";
import FriendRoute from "./friendroute.component";
import {getRouteShareByFriend} from "./Service/friendrouteService";
import {fetchDocument} from "tripledoc";
import {schema} from "rdf-namespaces";
import Point from "../../entities/Point";
import Route from "../../entities/Route";


export class FriendrouteContainer extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            routes: []
        }
    }

    componentDidMount() {
        const {webId} = this.props;
        if (webId) {
            this.getFriends();
        }
    }

    componentDidUpdate(prevProps) {
        const {webId} = this.props;
        if (webId && webId !== prevProps.webId) {
            this.getFriends();
        }
    }

    getFriends = async () => {
        this.setState({isLoading: true});
        const {webId} = this.props;
        const user = data[webId];
        let friends = [];

        for await (const friend of user.friends) {
            const friendWebId = await friend.value;
            const friend_data = data[friendWebId];
            const name = await friend_data.name;
            var information = {
                "webId": friendWebId,
                "name": name.toString()
            }
            friends.push(information);
        }
        console.log("He sacao tus amigos")
        this.setState({friends: friends});
    }

    getRoutesSharedWithMe = async (friendWebId) => {
        console.log("Voy a intentar sacar la ruta del amigo al que pinches")
        console.log("Has pinchao a tu amigo " + friendWebId)

        this.setState({isLoading: true});
        const {webId} = this.props;
        console.log("Mi webId " + webId)
        const user = data[webId];

        let routes = []
        for await (const friend of user.friends) {
            routes = await getRouteShareByFriend(webId, friendWebId)
        }

        if (routes.length !== 0) {
            var ruta = []
            for (let x = 0; x < routes.length; x++) {
                ruta.push(routes[x]);
            }
        }

        var rutas = [];

        for (const route of routes) {
            var routeDocument;
            console.log("Cuantas rutas hay segun donde pincho: " + routes.length)
            console.log(route)
            await fetchDocument(Object(route)).then((content) => {
                routeDocument = content;
                console.log("routeDocument " + routeDocument);
                console.log("content " + content)
            }).catch(err => routeDocument = null);

            console.log("routeDocument2 " + routeDocument);

            if (routeDocument != null) {
                const route = routeDocument.getSubject("http://example.org/myRoute");
                const points = route.getAllLocalSubjects('http://arquisoft.github.io/viadeSpec/point');

                console.log("He pasao el if del routeDocument != null");

                let pointsArray = [];
                points.forEach(point =>
                    pointsArray.push(new Point(point.getDecimal(schema.latitude), point.getDecimal(schema.longitude))));
                console.log("por el medio a ver si pasa")
                if (route.getString(schema.name) !== null) {
                    rutas.push(new Route(route.getString(schema.name), pointsArray, route.getString(schema.description)));
                    console.log(rutas.length)
                }
            }
        }
        this.setState({routes: rutas});
    };

    render() {
        const {friends, routes} = this.state;
        const see = {
            getRoutesSharedWithMe: this.getRoutesSharedWithMe.bind(this)
        };
        console.log(routes);
        return (
            <FriendRoute {...{friends, routes, see}} />
        );
    }
}