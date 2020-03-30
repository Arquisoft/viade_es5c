import React,{useState,useCallback} from "react";
import {ShareWrapper, Input, Label} from "./shareroutes.style";
import { NotificationTypes } from "@inrupt/solid-react-components";
import { notification} from "../../utils";
import {useNotification} from '@inrupt/solid-react-components';

import {space, schema} from 'rdf-namespaces';
import {fetchDocument} from 'tripledoc';

const auth = require('solid-auth-client');
const FC = require('solid-file-client');
const fc = new FC(auth);

const CreateShareRoute =(props)=> {


    let listRoutes = async () => {
        const {webId} = this.props;
        const profileDocument = await fetchDocument(webId);
        const profile = profileDocument.getSubject(webId);
        // Get the root URL of the user's Pod:
        const storage = profile.getRef(space.storage);
        let folder;
        await fc.readFolder(storage + 'inbox/').then((content) => {
            folder = content;
        }).catch(err => folder = null);
        var result = [];
        console.log("Folder: " + folder);
        if (folder) {
            for (let i = 0; i < folder.files.length; i++) {
                let routeDocument;
                await fetchDocument(folder.files[i].url).then((content) => {
                    routeDocument = content;
                }).catch(err => routeDocument = null);
                console.log("Route document: " + folder.files[i].url);
            }
            this.state.rutas = result;
        }
    };
    

        return (
            <ShareWrapper>
                <form >
                    <p>List Routes</p>
                    <Label>
                        Route's webID:
                        <Input
                            type="text"
                            name="route"
                        />
                    </Label>

                    <Label>
                        Insert your friend's webID:
                        <Input
                            type="text"
                            name="friend"
                        />
                    </Label>
                    <Input type="submit" value="Submit"/>
                </form>
            </ShareWrapper>
        );
    
}

export default CreateShareRoute