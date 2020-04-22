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
            console.log("PASE POR AQUI")
        }
    }

    componentDidUpdate(prevProps) {
        const {webId} = this.props;
        if (webId && webId !== prevProps.webId){
            this.getRoutesSharedWithMe();
        }
    }

    getRoutesSharedWithMe = async () => {
        this.setState({isLoading: true});
        const {webId} = this.props;
        const user = data[webId];
        let friends = [];
        let friendWebId = "";

        for await (const friend of user.friends) {
            friendWebId = await friend.value;
            let routes = await getRouteShareByFriend(webId, friendWebId)
            /*if (!routes.length == 0) {
                friends.push(routes + '\n');
            }*/
            if (routes.length !== 0) {
                let rutas = []
                for(let x = 0; x < routes.length; x++){
                    //rutas.push(routes[x].split(",")[x]);
                    console.log("PRUEBA BORJA: " + rutas);
                    console.log("ROUTES " + routes[x]);
                    rutas.push(routes[x]);
                }
                console.log("RUTAAAAAAAS " + rutas.length)
                friendsRouteIDS.push(rutas);
                console.log("final " + friendsRouteIDS)
               /* if(true){ //nop
                    friendsRouteIDS.push(routes + '\n');
                    console.log("FRIENDS ROUTES IDS " + friendsRouteIDS);
                }*/
            }
        }

        //this.setState({friends});
        console.log("Lista " + friends);
        console.log("POR AQUI TB");
        const fc = new FC(auth);
        const {webId} = this.props;
        var rutas = [];
        console.log("state friends " + this.state.friends)
        console.log("state friends length" + this.state.friends.length)
        for (let i = 0; i < this.state.friends.length; i++) {
            let routeDocument = null;
            console.log("PRUEBA: " +routeDocument);
            console.log("this.state.friends[i].url "+ this.state.friends[i])
            fetchDocument(this.state.friends[i]).then((content) => {
                routeDocument = content;
            }).catch(err => routeDocument = null);
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
        const {friends, rutas} = this.state;
        return (
            <FriendRoute {...{friends, rutas}} />
        );
    }
}