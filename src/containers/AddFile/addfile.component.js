import React from 'react';
import auth from "solid-auth-client";
import FC from 'solid-file-client';
import {ParserRouteToRDF, ParserToRoute} from "../../parseo";
import RouteVisualizer from '../../components/RouteVisualizer/RouteVisualizer.component'
import ReactDOM from 'react-dom';
import {Button, H1, Header, INPUT, LABEL, Wrapper} from "./addfile.style";
import i18n from '../../i18n';

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
            const url = webId.split("profile/card#me")[0] + "viade2Prueba1/routes/" + rutaClass.name + ".ttl";
            await fc.createFile(url, parseadoRDF, "text/turtle", {});
            console.log("subido");


            const domContainer = document.querySelector('#mapa');
            ReactDOM.render(<RouteVisualizer ruta={rutaClass}></RouteVisualizer>, domContainer);

        }

    }


    return (
        <Wrapper>
            <div>
                <Header>
                    <H1>{i18n.t('addFile.title')}</H1>
                </Header>
                <LABEL>
                    <INPUT type="file" name="files[]" id="file" onChange={selectFile}/>
                </LABEL>
                <Button onClick={handlerUpload}>{i18n.t('addFile.loadPod')}</Button>

                <div id="mapa"></div>
            </div>
        </Wrapper>


    );
}


export default LoadFile;


