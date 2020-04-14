import React from 'react';
import {RouteCard, RouteDetail} from "./timelineroute.style";
import RouteVisualizer from "../../../components/RouteVisualizer/RouteVisualizer.component";
import Popup from "reactjs-popup";
import styled from 'styled-components';

const StyledPopup = styled(Popup)`
.modal {
  width: 100%;
  padding: 0px 5px;
  margin: auto;
  text-align: center;
}
span{
background-color: white;
}
background-color: transparent;
`
export const RouteView = props => {
    const {ruta} = props;

    return (
        <RouteCard className="card">
            <RouteDetail data-testid="welcome-detail">
                <div className="modal">
                    <StyledPopup
                        trigger={<button className="button"> {ruta.name} </button>}
                        modal
                        closeOnDocumentClick
                    >
                        <span> <RouteVisualizer ruta={ruta}></RouteVisualizer></span>
                        <p><br></br></p><p><br></br></p><p><br></br></p><p><br></br></p><p><br></br></p>
                        <p><br></br></p><p><br></br></p><p><br></br></p><p><br></br></p><p><br></br></p>
                        <p><br></br></p><p><br></br></p><p><br></br></p><p><br></br></p><p><br></br></p>


                    </StyledPopup>
                </div>
            </RouteDetail>
        </RouteCard>

    );
};