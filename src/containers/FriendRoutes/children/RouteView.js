import React from 'react';
import {RouteCard, RouteDetail} from "./timelineroute.style";
import RouteVisualizer from "../../../components/RouteVisualizer/RouteVisualizer.component";
import Popup from "reactjs-popup";
import MediaLoader from "../../../utils/MediaLoader";
import ReactDOM from 'react-dom';
import i18n from "../../../i18n";


export const RouteView = props => {
    const {data} = props;
    var ruta = data.ruta;
    var i = 0;

    function verMultimedia() {
        const loader = new MediaLoader();
        const img = document.querySelector('#img');
        const buttonR = document.querySelector('#buttonR');
        const buttonL = document.querySelector('#buttonL');


        if (ruta.media.length === 0) {
            ReactDOM.render(<p>{i18n.t('routeView.availability')}</p>, img);
        }else{
            if(i<0){
                i=0;
            }
            if(i>ruta.media.length-1){
                i=ruta.media.length-1;
            }
            if (ruta.media[i].type === "video") {
                loader.loadMedia(ruta.media[i].contentUrl, function (file) {
                    var imageUrl = URL.createObjectURL(file);
                    ReactDOM.render(<video controls className="d-block route-img" src={imageUrl} width="500"
                                           height="500"/>, img);
                });
            } else if (ruta.media[i].type === "image") {
                loader.loadMedia(ruta.media[i].contentUrl, function (file) {
                    var imageUrl = URL.createObjectURL(file);
                    ReactDOM.render(<img src={imageUrl} alt={"foto" + ruta.fileName} width="500" height="500"/>, img);
                });
            }

            if(ruta.media.length>=2){
                ReactDOM.render(<button id={"mediaIzq"} className="button" onClick={() => {i--; verMultimedia()}} style={{float:"left"}}><img
                    src="img/icon/flecha_izquierda.svg"
                    width="20px"
                    alt="x"/></button>, buttonL
                );
                ReactDOM.render(<button id={"mediaDer"} className="button" onClick={() => {i++; verMultimedia()}} style={{float:"right"}}>
                    <img src="img/icon/flecha_derecha.svg" width="20px"
                         alt="x"/></button>, buttonR
                );
            }
        }
    }

    return (
        <RouteCard className="card">
            <RouteDetail data-testid="welcome-detail">
                <div className="modal">
                    <br></br>
                    <Popup
                        trigger={<button id={"verRuta"} className="button"> {ruta.name} </button>}
                        modal
                        closeOnDocumentClick
                    >
                        <span className="map"> <RouteVisualizer ruta={ruta}></RouteVisualizer></span>
                        <div id={"img"}></div>
                        <p><br></br></p><p><br></br></p><p><br></br></p><p><br></br></p><p><br></br></p>
                        <p><br></br></p><p><br></br></p><p><br></br></p><p><br></br></p><p><br></br></p>
                        <p><br></br></p><p><br></br></p><p><br></br></p><p><br></br></p><p><br></br></p>
                    </Popup>
                    <Popup
                        trigger={<button id={"mediaRuta"} className="button"> <img src="img/icon/addRoute.svg" width="20px" alt="x"/> </button>}
                        modal
                        closeOnDocumentClick
                    >
                        <p><br></br></p><p><br></br></p>
                        <button className="button" onClick={() => verMultimedia()}>{i18n.t('routeView.viewMedia')}</button>
                        <p></p>
                        <div id={"buttonL"}></div>
                        <div id={"buttonR"}></div>
                        <p></p>
                        <div id={"img"}></div>

                        <p><br></br></p>
                    </Popup>
                </div>
            </RouteDetail>
        </RouteCard>

    );
};