import React,{useState,useCallback} from "react";
import {ShareWrapper, Input, Label} from "./shareroutes.style";
import { NotificationTypes } from "@inrupt/solid-react-components";
import { notification} from "../../utils";
import {useNotification} from '@inrupt/solid-react-components';
import {space, schema} from 'rdf-namespaces';
import {fetchDocument} from 'tripledoc';
const auth = require('solid-auth-client');

class CreateShareRoute extends React.Component {
     constructor(props) {
        super(props);
        this.friendWebID = {value: ''};
        this.routeWebID = {value: ''};

        this.handleChange = this.handleChange.bind(this);
     }

     handleChange(event) {
        this.friendWebID({value: event.target.value});
        this.routeWebID({value: event.target.value});
     }

     render (){
        return (
         <ShareWrapper>
            <form >
                <p>Insert the following webID's to share the route</p>
                <Label>
                    Route's webID:
                    <Input type="text" value={this.routeWebID.value} onChange={this.handleChangeRoute}/>
                </Label>

                <Label>
                    Insert your friend's webID:
                    <Input type="text" value={this.friendWebID.value} onChange={this.handleChangeRoute}/>
                </Label>
                <Input type="submit" value="Submit"/>
            </form>
        </ShareWrapper>
        )
    }

}

export default CreateShareRoute