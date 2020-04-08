import React from "react";
import {Button, Header, Input, Label, RouteWrapper} from "../AddRoute/addroute.style";
import {CreateMap} from "../../components";
import data from "@solid/query-ldflex";
import FC from "solid-file-client";
import auth from "solid-auth-client";
import {ShareWrapper} from "../ShareRoutes/shareroutes.style";
import isLoading from "../../hocs/isLoading";

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

    /*
    componentDidMount() {
        const { webId } = this.props;
        if (webId) this.getProfileData();
    }

    componentDidUpdate(prevProps) {
        const { webId } = this.props;
        if (webId && webId !== prevProps.webId) {
            this.getProfileData();
        }
    }
*/


    getProfileData = async (nombre) => {
        this.setState({isLoading: true});
        const {webId} = this.props;
        const user = data[webId];
        let name;
        let friendsRoutes = [];
        let routes = [];

        for await (const friend of user.friends) {
            const friendWebId = await friend.value;
            const friend_data = data[friendWebId];
            const nameLd = await friend_data.name;


            try {
                var url = friendWebId.split("profile/card#me")[0] + "public/viade/routes/";
                let folder = await this.fc.readFolder(url);
                folder.files.forEach((element) => {
                    routes.push(element.name);
                });


            } catch (e) {
                console.log(e);
            }
            name = nameLd && nameLd.value.trim().length > 0 ? nameLd.value : friendWebId.toString();
            var friend_obj = {
                "webId": friendWebId,
                "name": name,
                "rutas": routes
            }

        }
        if (nombre == friend_obj.name){
            this.routes_of_friends = routes;
            friendsRoutes.push(routes)
        }

        this.setState({friendsRoutes});

    };

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value})

    }

    handleSubmit = e => {
        e.preventDefault();
        this.getProfileData(this.state.name);
        this.state = []
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
                        <button type="submit">Send</button>

                        <p>{this.listRoutes()}</p>
                    </form>
                </div>

            </ShareWrapper>
        );
    }
}

export default ListFriendRoutes