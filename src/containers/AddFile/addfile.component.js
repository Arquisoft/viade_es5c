import React from 'react';
import auth from "solid-auth-client";
import FC from 'solid-file-client';
import {ParserToRoute, ParserRouteToRDF} from "../../parseo";


import RouteVisualizer from '../../components/RouteVisualizer/RouteVisualizer.component'
import ReactDOM from 'react-dom';
import {Button, Header, Input, Label} from "./addfile.style";

const LoadFile = (props) => {
    let files = '';


    const selectFile = (event) => {
        files = event.target.files;
    }


    const handlerUpload = async (e) => {
        if (files !== '') {
            e.preventDefault(); //Cancelar el evento
            const fichero = files[0];
            const {webId} = props;
            const fc = new FC(auth);
            //const nombre=fichero.name;

            let parseadoRuta;
            try {
                parseadoRuta = ParserToRoute.parse(fichero);
            } catch (err) {
                console.log("COGE EL ERROR");
            }


            let rutaClass = await parseadoRuta.then((rutaClass) => {
                return rutaClass
            });

            let parseadoRDF = ParserRouteToRDF.parse(rutaClass);
            console.log(parseadoRDF);
            const url = webId.split("profile/card#me")[0] + "public/viade/routes/" + rutaClass.name;
            await fc.createFile(url, parseadoRDF, "text/turtle", {});
            console.log("subido");


            const domContainer = document.querySelector('#mapa');
            ReactDOM.render(<RouteVisualizer ruta={rutaClass}></RouteVisualizer>, domContainer);

        }

    }


    return (
        <div>
            <Header>Subir ruta</Header>
            <Label>
                Cargar ruta:
                <Input type="file" name="files[]" id="file" onChange={selectFile}/>
            </Label>
            <Button onClick={handlerUpload}>Cargar POD</Button>

            <div id="mapa"></div>
        </div>


    );
}


export default LoadFile;


