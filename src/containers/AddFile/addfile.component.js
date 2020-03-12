import React from 'react';
import auth from "solid-auth-client";
import FC from 'solid-file-client';
import Route from 'Route';
import RouteVisualizer from 'RouteVisualizer.component'
import ReactDOM from 'react-dom'

const LoadFile = (props) => {

    const handleSubmit = async (e) => {
        const fileReader = new FileReader();
        fileReader.fileName=e.target.files[0].name;
        const {webId} = props;
        
        fileReader.onload = async (event) => {
            const fc   = new FC( auth );
            const nombre=event.target.fileName;
            const url=webId.split("profile/card#me")[0]+"rutas/"+nombre;
            console.log(url);
            await fc.createFile(url, event.target.result, "application/geo+json", {});
            console.log("subido");
        };
        fileReader.readAsText(e.target.files[0]);
        
        
        var ruta= new Route(fileReader.result);
        const domContainer = document.querySelector('#mapa');
        ReactDOM.render(<RouteVisualizer ruta= {ruta}></RouteVisualizer>, domContainer);
        
    }

    

    return (
        <div>
            <h1>Subir ruta</h1>
            <label>
                Cargar ruta:
            <input type="file" name="files[]" id="file" onChange={handleSubmit} />
            </label> 
           
            <div id="mapa"></div>
        </div>
       

    );
}


  

export default LoadFile;


