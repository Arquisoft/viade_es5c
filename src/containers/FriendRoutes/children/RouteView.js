import React from 'react';
import {RouteCard, RouteDetail} from "./timelineroute.style";
import RouteVisualizer from "../../../components/RouteVisualizer/RouteVisualizer.component";
import Popup from "reactjs-popup";
import MediaLoader from "../../../utils/MediaLoader";
import ReactDOM from 'react-dom';
import {Card} from "react-bootstrap";
import i18n from "../../../i18n";


export const RouteView = props => {
    const {data} = props;
    //const {shareRoute} = props;
    var ruta = data.ruta;
    let comentario = "";
    var i =0;

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
                    // const img = document.querySelector('#img');
                    ReactDOM.render(<video controls className="d-block route-img" src={imageUrl} width="500"
                                           height="500"/>, img);
                });
            } else if (ruta.media[i].type === "image") {
                loader.loadMedia(ruta.media[i].contentUrl, function (file) {
                    var imageUrl = URL.createObjectURL(file);
                    // const img = document.querySelector('#img');
                    ReactDOM.render(<img src={imageUrl} alt={"foto" + ruta.fileName} width="500" height="500"/>, img);
                });
            }

            if(ruta.media.length>=2){
                ReactDOM.render(<button className="button" onClick={() => {i--; verMultimedia()}}><img
                    src="../../../../img/icon/flecha_izquierda.svg"
                    width="20px"
                    alt="x"/></button>, buttonL
                );
                ReactDOM.render(<button className="button" onClick={() => {i++; verMultimedia()}}>
                    <img src="../../../../img/icon/flecha_derecha.svg" width="20px"
                         alt="x"/></button>, buttonR
                );
            }
        }
    }

    function comments() {
        if (ruta.comments.length !== 0) {
            let commentarios = [];
            for (let i = 0; i < ruta.comments.length; i++) {
                commentarios.push(<Card><Card.Body> <Card.Title>{ruta.comments[i].comment.text}</Card.Title>
                    <footer className="blockquote-footer"> Publicado
                        el: {ruta.comments[i].comment.createdAt}</footer>
                </Card.Body> </Card>)
            }
            const domContainer = document.querySelector('#comentarios');
            ReactDOM.render(commentarios, domContainer);
        } else {
            const domContainer = document.querySelector('#comentarios');
            ReactDOM.render(<Card><Card.Body><Card.Title>No hay comentarios en esta
                ruta</Card.Title></Card.Body></Card>, domContainer);
        }
    }

    return (
        <RouteCard className="card">
            <RouteDetail data-testid="welcome-detail">
                <div className="modal">
                    <br></br>
                    <Popup
                        trigger={<button className="button"> {ruta.name} </button>}
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
                        trigger={<button className="button"> <img src="../../../../img/icon/addRoute.svg" width="20px" alt="x"/> </button>}
                        modal
                        closeOnDocumentClick
                    >
                        <p><br></br></p><p><br></br></p>
                        <button className="button" onClick={() => verMultimedia()}>{i18n.t('routeView.viewMedia')}</button>
                        <p></p>
                        <div id={"img"}></div>
                        <p><br></br></p>
                    </Popup>
                </div>
            </RouteDetail>
        </RouteCard>

    );
};