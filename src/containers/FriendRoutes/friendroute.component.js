import React, {Component} from "react";
import {Label} from "../AddRoute/addroute.style";
import data from "@solid/query-ldflex";
import FC from "solid-file-client";
import auth from "solid-auth-client";
import {ShareWrapper} from "../ShareRoutes/shareroutes.style";
import { Dropdown } from "react-bootstrap";
import DropdownButton from 'react-bootstrap/DropdownButton';
import {Button, H1, Header, Input, RouteList} from "./friendroute.style";
import i18n from '../../i18n';

class ListFriendRoutes extends Component<Props> {
    constructor(props) {
        super(props);

        this.fc = new FC(auth);
        this.state = {
            name: '',
            friendsRoutes: [],
            friendsWebId:[]
        };
        this.routes_of_friends = [];


    }

    componentDidMount() {
        const { webId } = this.props;
        if (webId) this.getFriends();
    }

    componentDidUpdate(prevProps) {
        const { webId } = this.props;
        if (webId && webId !== prevProps.webId) {
            this.getFriends();
        }
    }

    getFriends =async()=>{
        this.setState({isLoading: true});
        const {webId} = this.props;
        const user = data[webId];
        let friends=[];

        for await (const friend of user.friends) {
            const friendWebId = await friend.value;
            //const friend_data = data[friendWebId];
            //const nameLd = await friend_data.name;
            //console.log("nameLD " + nameLd)
            friends.push(friendWebId);
        }
        this.setState({friendsWebId:friends})
        console.log(this.state.friendsWebId);
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
            //console.log("nameLD " + nameLd)

            try {

                // eslint-disable-next-line eqeqeq
                if (nombre == nameLd) {
                    var url = friendWebId.split("profile/card#me")[0] + "public/viade/routes/";
                    console.log("url " + url)
                    let folder = await this.fc.readFolder(url);
                    //console.log("nombre===nameLd" + nombre==nameLd)
                    folder.files.forEach((element) => {
                        routes.push(element.name);
                    });
                    //console.log(routes)
                }
            } catch (e) {
                console.log(e);
            }


        }
        this.routes_of_friends = routes;
        friendsRoutes.push(routes)

        //console.log(this.routes_of_friends)
        this.setState({friendsRoutes});

    };

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value})

    }

    handleSubmit = e => {
        e.preventDefault();
        this.getProfileData(this.state.name);
        this.setState([])
        this.value = ''
        this.routes_of_friends = []
    }

    listRoutes = () => {
        let aux = [];

        for (let i = 0; i < this.routes_of_friends.length; i++) {
            aux.push(<li key={i}>{this.routes_of_friends[i] + '\n'}</li>)
        }

        this.routes_of_friends = [];
        return aux;
    }

    seleccionarAmigo=async(e)=>{

    }

    render() {
        const {name} = this.state;
        const {friendsWebId}=this.state;
        console.log(friendsWebId);
        return (
            <ShareWrapper>
                <Header>
                    <H1>{ i18n.t('friendRoutes.title')}</H1>
                </Header>
                <Dropdown key="Dropdown" style={{margin:'20px'}}>

                                    <div>
                                        Amigos
                                        <DropdownButton title="Amigos">
                                            {friendsWebId.map((friend)=>(
                                                <Dropdown.Item key={friend}>{friend}</Dropdown.Item>

                                            ))}
                                        </DropdownButton>
                                    </div>

                                </Dropdown>
                    <form onSubmit={this.handleSubmit}>
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