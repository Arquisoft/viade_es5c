import React,{useState,useCallback} from "react";
import {ShareWrapper, Input, Label} from "./shareroutes.style";
import { NotificationTypes } from "@inrupt/solid-react-components";
import { notification} from "../../utils";
import {useNotification} from '@inrupt/solid-react-components';

const CreateShareRoute =(props)=> {

    

        return (
            <ShareWrapper>
                <form onSubmit={handleSubmit}>
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