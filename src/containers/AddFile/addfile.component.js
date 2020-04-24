import React from 'react';
import auth from "solid-auth-client";
import FC from 'solid-file-client';
import {ParserRouteToRDF, ParserToRoute} from "../../parseo";
import RouteVisualizer from '../../components/RouteVisualizer/RouteVisualizer.component'
import ReactDOM from 'react-dom';
import {Button, H1, Header, Wrapper,Fo} from "./addfile.style";
import i18n from '../../i18n';
import Form from "react-bootstrap/Form";
import {errorToaster} from '@utils';
import {v1 as uuidv1} from 'uuid';
import Media from '../../entities/Media';
import MediaLoader from "../../utils/MediaLoader";

const LoadFile = (props) => {
    let files = '';
    
    let media = [];
    let name = React.createRef();
    let description = React.createRef();
    let comment = React.createRef();


    const selectFile = (event) => {
        files = event.target.files;
    }
    const selectMedia = (event) => {
        let z=0;
        for (var i=0;i<event.target.files.length;i++){
            if (event.target.files[i].type.split("/")[0]!=="image" && event.target.files[i].type.split("/")[0]!=="video"){
                z++;
            }
            media.push(event.target.files[i]);
        }
        if (z===0){

        }else{
            media=[];
            event.target.value=null;
            errorToaster(i18n.t('addFile.errorMedia'), 'Error', {
            });
        }
        console.log(media);
    }

    const handlerUpload = async (e) => {
        if (files !== '') {
            e.preventDefault(); //Cancelar el evento
            const fichero = files[0];
            const {webId} = props;
            const fc = new FC(auth);
            //const nombre=fichero.name;
            let valueName=name.current.value;
            let valueDescription=description.current.value;
            let valueComment=comment.current.value;
            if (valueName===""){
                errorToaster(i18n.t('addFile.errorNoName'), 'Error', {
                });
            }else{
                const type = fichero.name.split(".")[1];
                
                if (type!=="geojson" && type!=="gpx" && type!=="kml")
                {
                    errorToaster(i18n.t('addFile.errorTipoFichero'), 'Error', {
                    });
                }else{
                    let parseadoRuta;
                    try {
                        parseadoRuta = ParserToRoute.parse(fichero);
                    } catch (err) {
                        console.log("COGE EL ERROR");
                    }


                    let rutaClass = await parseadoRuta.then((rutaClass) => {
                        return rutaClass
                    });
                    rutaClass.name=valueName
                    rutaClass.description=valueDescription;
                    rutaClass.comments=valueComment;    
                    rutaClass.uuid=uuidv1().split("-").join("");
                    let loader = new MediaLoader();
                    const path_resources=webId.split("profile/card#me")[0] + "viade2Prueba1/resources/";
                    for (var i=0;i<media.length;i++){
                        let extension="."+media[i].name.split(".").slice(-1)[0];
                        let urlMedia=uuidv1().split("-").join("")+extension;
                        //Subir la media
                        
                        loader.saveImage(path_resources+urlMedia, media[i],media[i].type);
                        if (media[i].type.split("/")[0]==="image"){
                            rutaClass.media.push(new Media(urlMedia,webId,new Date(),"image"));
                        }
                        if (media[i].type.split("/")[0]==="video"){
                            rutaClass.media.push(new Media(urlMedia,webId,new Date(),"video"));
                        }
                       
                    }
                    console.log(rutaClass)
                    /*
                    let parseadoRDF = ParserRouteToRDF.parse(rutaClass);

                    console.log(parseadoRDF);
                    const url = webId.split("profile/card#me")[0] + "viade2Prueba1/routes/" + rutaClass.uuid + ".ttl";
                    await fc.createFile(url, parseadoRDF, "text/turtle", {});
                    console.log("subido");


                    const domContainer = document.querySelector('#mapa');
                    ReactDOM.render(<RouteVisualizer ruta={rutaClass}></RouteVisualizer>, domContainer);
                    */
                }
            }

        }else{
            errorToaster(i18n.t('addFile.errorNoFile'), 'Error', {
            });
        }

    }


    return (
        <Wrapper>
            
            <Header>
                    <H1>{i18n.t('addFile.title')}</H1>
                </Header>
            
                <Form>
                <Fo>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" 
                        ref={name}/>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter description"
                        ref={description} />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formBasicFichero">
                        <Form.Label>Add file</Form.Label>
                        <Form.File id="formcheck-api-regular">
                            
                            <Form.File.Input type="file" name="files[]" id="file" onChange={selectFile}/>
                        </Form.File >
                    </Form.Group>
                    
                    </Fo>
                    <br />
                    <Fo>
                        <Form.Group controlId="formBasicComment">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control type="text" placeholder="Enter comment" 
                            ref={comment}/>
                            <Form.Text className="text-muted">
                            You can add a comment if you want.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicImage">
                        <Form.Label>Add media</Form.Label>
                        <Form.File id="formcheck-api-regular">
                            
                            <Form.File.Input type="file" name="media[]" red={media} id="media" accept={"image/*,video/*"}
                            onChange={selectMedia} multiple/>
                        </Form.File >
                    </Form.Group>
                        </Fo>
                
                    <Button id="submitId" type="submit" onClick={handlerUpload}>{i18n.t('addFile.loadPod')}</Button>
                </Form>
                <div id="mapa"></div>
        </Wrapper>

       
    );
}


export default LoadFile;


