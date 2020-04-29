import React, {Component} from "react";
import {RoutesView} from './RoutesView';
import Service from '../../Service/Service';

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
        if (webId) {
            this.listRoutes();
            this.getFriends();
        }
    }

    componentDidUpdate(prevProps) {
        const {webId} = this.props;
        if (webId && webId !== prevProps.webId) {
            this.listRoutes();
            this.getFriends();
        }
    }

    getFriends = async () => {
        let friends = await Service.getFriends();
        this.setState({friends: friends});
    };

    listRoutes = async () => {
        let rutas = await Service.getRoutes();
        this.setState({rutas: rutas});
    };

    render() {
        const {rutas, friends} = this.state;

        return (<
                RoutesView {...{rutas, friends}}
            />
        );
    }
}