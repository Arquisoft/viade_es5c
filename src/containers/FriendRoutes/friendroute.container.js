import React, {Component} from "react";
import data from "@solid/query-ldflex";
import FriendRoute from "./friendroute.component";
import {getRouteShareByFriend} from "./Service/friendrouteService";
import {fetchDocument} from "tripledoc";
import {schema, space} from "rdf-namespaces";
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

    getFriends = async () =>{
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
        this.setState({friends:friends});
    }

    getRoutesSharedWithMe = async (friendWebId) => {
        console.log("Voy a intentar sacar la ruta del amigo al que pinches")
        console.log("Has pinchao a tu amigo " + friendWebId)
        this.setState({isLoading: true});
        const {webId} = this.props;
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
        this.setState({route:ruta});

        var rutas = [];

        for (let i = 0; i < this.state.route.length; i++) {
            let routeDocument;
            console.log("prueba url "+ this.state.route[i])
            /*fetchDocument(this.state.route[i]).then((content) => {
                routeDocument = content;
            }).catch(err => routeDocument = null);*/
            routeDocument = this.state.route[i];
            console.log("routeDocument " + routeDocument);

            if (routeDocument != null) {
                const route = routeDocument.getSubject("http://example.org/myRoute");
                const points = route.getAllLocalSubjects('http://arquisoft.github.io/viadeSpec/point');
                console.log("He pasao el if del routeDocument != null");
                //Provisional cause we dont really know how to obtain the points from the schema
                let pointsArray = [];
                for (i = 0; i < points.length; i++)
                    pointsArray.push(new Point(points[i].getDecimal(schema.latitude), points[i].getDecimal(schema.longitude)));

                let ruta = new Route(route.getString(schema.name), pointsArray, route.getString(schema.description));
                console.log(ruta);
                rutas.push(ruta);
            }
        }

        this.setState({rutas: rutas});


    }


    render() {
        const {friends} = this.state;
        const see = {
            getRoutesSharedWithMe: this.getRoutesSharedWithMe.bind(this)
        };
        return (
            <FriendRoute {...{friends, see}} />
        );
    }
}