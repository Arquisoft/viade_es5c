import React from 'react';
import {RouteCard, RouteDetail} from "./timelineroute.style";
import RouteVisualizer from "../../../components/RouteVisualizer/RouteVisualizer.component";
import Popup from "reactjs-popup";
import MediaLoader from "../../../utils/MediaLoader";
import ReactDOM from 'react-dom';
import {Button, Card, FormControl, InputGroup} from "react-bootstrap";



export const RouteView = props => {
    const {ruta} = props;
    let comentario = "";
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

    function addComment() {
        let date = new Date();
        ruta.comments.push({
            comment: {
                text: comentario,
                createdAt: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay()
            }
        });
        comentario = "";
        comments();
        const domContainer = document.querySelector('#input-comentario');
        domContainer.value = "";
    }

    function handleCommentChange(event) {
        event.preventDefault();
        comentario = event.target.value;
    }


    function comments() {
        try {
            let commentarios = [];
            for (let i = 0; i < ruta.comments.length; i++) {
                commentarios.push(<Card><Card.Body> <Card.Title>{ruta.comments[i].comment.text}</Card.Title>
                    <footer className="blockquote-footer"> Publicado
                        el: {ruta.comments[i].comment.createdAt}</footer>
                </Card.Body> </Card>)
            }
            const domContainer = document.querySelector('#comentarios');
            ReactDOM.render(commentarios, domContainer);
        }
        catch (e) {
            const domContainer = document.querySelector('#comentarios');
            ReactDOM.render(<Card><Card.Body><Card.Title>No hay comentarios en esta
                ruta</Card.Title></Card.Body></Card>, domContainer);
        }
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

                    <Popup
                        trigger={<button className="button"> Comentarios </button>}
                        modal
                        closeOnDocumentClick
                    >
                        <h4>Comentarios</h4>
                           
                            <Button
                                variant="success"
                                data-testid="button-show-comment"
                                id="button-show-comment"
                                size="sm"
                                onClick={() => comments()}
                            >
                                Ver Comentarios
                            </Button>
                            
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <Button
                                            variant="success"
                                            data-testid="button-add-comment"
                                            id="button-add-comment"
                                            size="sm"
                                            onClick={() => addComment()}
                                        >
                                            Añadir comentario
                                        </Button>
                                    </InputGroup.Prepend>
                                    <FormControl aria-describedby="basic-addon1" onChange={handleCommentChange} id={"input-comentario"}/>
                                </InputGroup>
                            
                                <div id={"comentarios"}></div>
                            
                    </Popup>

                    
                </div>
            </RouteDetail>
        </RouteCard>

    );
};