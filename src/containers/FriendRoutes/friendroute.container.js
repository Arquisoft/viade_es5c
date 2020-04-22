import React, {Component} from "react";
import data from "@solid/query-ldflex";
import FriendRoute from "./friendroute.component";
import {getRouteShareByFriend} from "./Service/friendrouteService";
import FC from "solid-file-client";
import auth from "solid-auth-client";
import {fetchDocument} from "tripledoc";
import {schema, space} from "rdf-namespaces";
import Point from "../../entities/Point";
import Route from "../../entities/Route";

export class FriendrouteContainer extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            rutas: []
        }
    }

    componentDidMount() {
        const {webId} = this.props;
        if (webId){
            this.getRoutesSharedWithMe();
            this.listRoutes();
            console.log("PASE POR AQUI")
        }
    }

    componentDidUpdate(prevProps) {
        const {webId} = this.props;
        if (webId && webId !== prevProps.webId){
            this.getRoutesSharedWithMe();
            this.listRoutes();
        }
    }

    getRoutesSharedWithMe = async () => {
        this.setState({isLoading: true});
        const {webId} = this.props;
        const user = data[webId];
        let friendsRouteIDS = [];
        var rutas = [];
        let friendWebId = "";

        for await (const friend of user.friends) {
            friendWebId = await friend.value;
            let routes = await getRouteShareByFriend(webId, friendWebId);

            if (!routes.length == 0) {
                if(routes.length > 1){
                    for(let x = 0; x < routes.length; x++){
                        let rutas = []
                        rutas.push(routes[x].split(",")[x]);
                        console.log("RUTAS " + rutas);
                        friendsRouteIDS.push(routes[x].split(","));
                    }
                }else{
                    friendsRouteIDS.push(routes + '\n');
                    console.log("FRIENDS ROUTES IDS " + friendsRouteIDS);
                }
            }
        }

        //this.setState({friends});
        console.log("Lista " + friends);
    }

    listRoutes = async () => {
        console.log("POR AQUI TB");


        console.log("state friends " + this.state.friends)
        console.log("state friends length" + this.state.friends.length)
        for (let i = 0; i < this.state.friends.length; i++) {
            let routeDocument;
            console.log("PRUEBA: " +routeDocument);
            await fetchDocument(this.state.friends[i].url).then((content) => {
                routeDocument = content;
            }).catch(err => routeDocument = null);

            if (routeDocument != null) {
                const route = routeDocument.getSubject("http://example.org/myRoute");
                const points = route.getAllLocalSubjects('http://arquisoft.github.io/viadeSpec/point');

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
    };

    render() {
        const {friends, rutas} = this.state;
        return (
            <FriendRoute {...{friends, rutas}} />
        );
    }
}