import React from 'react';
import {Button, Header, ShareWrapper, Input, Label} from "./shareroutes.style";
import {CreateMap} from "../../components";
import {ParserRouteToRDF} from "../../parseo";
import Route from "../../entities/Route";

class CreateShareRoute extends React.Component {

    render() {
        return (
            <ShareWrapper>
                <form>
                    <label>
                        Route's webID:
                        <input
                            type="text"
                            name="route"
                        />
                    </label>
                    <label>
                        Insert your friend's webID:
                        <input
                            type="text"
                            name="friend"
                        />
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </ShareWrapper>
        );
    }
}

export default CreateShareRoute