import React from "react";
import {Input, Label} from "../AddRoute/addroute.style";
import data from "@solid/query-ldflex";
import FC from "solid-file-client";
import auth from "solid-auth-client";
import {ShareWrapper} from "../ShareRoutes/shareroutes.style";


class ListFriendRoutes extends React.Component {
    constructor(props) {
        super(props);
        this.fc = new FC(auth);
        this.state = {
            name: '',
            friendsRoutes: []
        };
        this.routes_of_friends = []

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

    render() {
        const {name} = this.state
        return (
            <ShareWrapper>
                <div>
                    <h1>Insert your friend name</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={this.handleChange}
                                />
                            </Label>
                        </div>
                        <button type="submit">See</button>

                        <p>{this.listRoutes()}</p>
                    </form>
                </div>

            </ShareWrapper>
        );
    }
}

export default ListFriendRoutes