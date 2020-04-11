import React, {Component} from "react";
import {Label} from "../AddRoute/addroute.style";
import data from "@solid/query-ldflex";
import FC from "solid-file-client";
import auth from "solid-auth-client";
import {ShareWrapper} from "../ShareRoutes/shareroutes.style";
import {Dropdown} from "react-bootstrap";
import {Button, H1, Header, Input, RouteList} from "./friendroute.style";
import i18n from '../../i18n';

class ListFriendRoutes extends Component<Props> {
    constructor(props) {
        super(props);
        this.fc = new FC(auth);
        this.state = {
            name: "",
            friendsRoutes: [],
            friendsWebId: []
        };
        this.routes_of_friends = [];
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    componentDidMount() {
        const {webId} = this.props;
        if (webId) this.getFriends();
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
                "friendname": name.toString()
            }
            friends.push(information);
        }
        this.setState({friendsWebId: friends})
    }


    listFriends = () => {
        let aux = [];
        for (let i = 0; i < this.list_of_friends.length; i++) {
            aux.push(<li key={i}>{this.list_of_friends[i] + '\n'}</li>)
        }
        return aux;
    }

    getProfileData = async (nombre) => {
        this.setState({isLoading: true});
        const {webId} = this.props;
        const user = data[webId];
        let friendsRoutes = [];
        let routes = [];

        for await (const friend of user.friends) {
            const friendWebId = await friend.value;
            const friend_data = data[friendWebId];
            const nameLd = await friend_data.name;

            try {
                // eslint-disable-next-line eqeqeq
                if (nombre == nameLd) {
                    var url = friendWebId.split("profile/card#me")[0] + "public/viade/routes/";

                    let folder = await this.fc.readFolder(url);

                    folder.files.forEach((element) => {
                        routes.push(element.name);
                    });
                }
            } catch (e) {
                console.log(e);
            }

        }
        this.routes_of_friends = routes;
        friendsRoutes.push(routes)

        this.setState({friendsRoutes});
    };

    listRoutes = () => {
        let aux = [];
        for (let i = 0; i < this.routes_of_friends.length; i++) {
            aux.push(<li key={i}>{this.routes_of_friends[i] + '\n'}</li>)
        }
        this.routes_of_friends = [];
        return aux;
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value})
        console.log(this.state.name)

    }

    handleSubmit = e => {
        e.preventDefault();
        this.getProfileData(this.state.name);
        this.value = ''
        this.routes_of_friends = []
    }

    handleDropdownChange(e) {
        this.setState({ name: e.target.value });
    }

    render() {
        const {friendsWebId} = this.state;
        const {name} = this.state;
        return (
            <ShareWrapper>
                <Header>
                    <H1>{i18n.t('friendRoutes.title')}</H1>
                </Header>
                <form onSubmit={this.handleSubmit}>
                   <Dropdown  className="dropdown" style={{margin:"10px"}} >
                       <div className="dropdown-menu">
                           {friendsWebId.map((friend) => (
                               <li key={friend.webId}>{friend.friendname}<br/></li>
                           ))}
                       </div>
                   </Dropdown>
                    <div>
                        <Label>
                            <Input
                                type="text"
                                name="name"
                                value={name}
                                placeholder={i18n.t('friendRoutes.namePlaceHolder')}
                                onChange={this.handleChange}
                            />
                        </Label>
                    </div>
                    <Button type="submit">{i18n.t('friendRoutes.buttonSee')}</Button>
                    <RouteList>{this.listRoutes()}</RouteList>
                </form>
            </ShareWrapper>
        );
    }
}

export default ListFriendRoutes