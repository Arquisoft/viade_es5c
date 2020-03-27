import React from 'react';
//import auth from "solid-auth-client";
//import FC from 'solid-file-client';
import {ParserToRoute,ParserRouteToRDF} from "../../parseo";

 
import RouteVisualizer from 'RouteVisualizer.component'
import ReactDOM from 'react-dom';


const LoadFile = (props) => {
    let files='';


    const selectFile =(event)=>{
        files=event.target.files;
    }

    
    const handlerUpload = async (e) => {
        if (files!==''){
            e.preventDefault(); //Cancelar el evento
        const fichero=files[0];
        //const {webId} = props;
        //const fc   = new FC( auth );
        //const nombre=fichero.name;
        //const url=webId.split("profile/card#me")[0]+"rutas/"+nombre;
        let parseadoRuta;
        try{
            parseadoRuta=ParserToRoute.parse(fichero);
        }catch(err){
            console.log("COGE EL ERROR");
        }
                
        let rutaClass=await parseadoRuta.then((rutaClass)=>{return rutaClass});
        console.log(rutaClass);
        //let parseadoRDF=ParserRouteToRDF.parse(rutaClass);
        
    /*
            await fc.createFile(url, parseadoRDF, "text/turtle", {});
            console.log("subido");
*/


        
        //const domContainer = document.querySelector('#mapa');
        //ReactDOM.render(<RouteVisualizer ruta= {rutaClass}></RouteVisualizer>, domContainer);
        
        }
        
    }
    

    return (
        <div>
            <h1>Subir ruta</h1>
            <label>
                Cargar ruta:
            <input type="file" name="files[]" id="file" onChange={selectFile} />
            </label> 
            <button onClick={handlerUpload}>Cargar POD</button>
            
            <div id="mapa"></div>
        </div>
       

    );
}


  

export default LoadFile;


