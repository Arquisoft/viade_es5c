import React from 'react';
import {RouteCard, RouteDetail} from "./timelineroute.style";
import RouteVisualizer from "../../../components/RouteVisualizer/RouteVisualizer.component";
import Popup from "reactjs-popup";
import MediaLoader from "../../../utils/MediaLoader";
import ReactDOM from 'react-dom';



export const RouteView = props => {
    const {ruta} = props;

    function verMultimedia() {
        const loader = new MediaLoader();
        const img = document.querySelector('#img'); 
        ReactDOM.render(<p>Media no disponible</p>, img);
        loader.loadMedia(ruta.getImg(), function (file) {
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(file);
            const img = document.querySelector('#img'); 
            ReactDOM.render(<img src={imageUrl} alt={"foto" + ruta.fileName} width="500" height="500"/>, img);
        });
        
        
    }
    return (
        <RouteCard className="card">
            <RouteDetail data-testid="welcome-detail">
                <div className="modal">
                    <Popup
                        trigger={<button className="button"> {ruta.name} </button>}
                        modal
                        closeOnDocumentClick
                    >
                        <span className="map"> <RouteVisualizer ruta={ruta}></RouteVisualizer></span>
                        <button className="button"  onClick={() => verMultimedia()}> Ver Media </button>
                         <div id={"img"}></div>
                        <p><br></br></p><p><br></br></p><p><br></br></p><p><br></br></p><p><br></br></p>
                        <p><br></br></p><p><br></br></p><p><br></br></p><p><br></br></p><p><br></br></p>
                        <p><br></br></p><p><br></br></p><p><br></br></p><p><br></br></p><p><br></br></p>


                    </Popup>
                    <Popup
                        trigger={<button className="button"> Media </button>}
                        modal
                        closeOnDocumentClick
                    >
                        <p><br></br></p><p><br></br></p>
                        <button className="button"  onClick={() => verMultimedia()}> Ver Media </button>
                        <p></p>
                        <div id={"img"}></div>
                        <p><br></br></p>
                    </Popup>
                </div>
            </RouteDetail>
        </RouteCard>

    );
};