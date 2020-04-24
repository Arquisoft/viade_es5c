import React from 'react';
import {Button, Header, Input, Label, RouteWrapper} from "./addroute.style";
import {CreateMap} from "../../components";
import {ParserRouteToRDF} from "../../parseo";
import Route from "../../entities/Route"
import FC from 'solid-file-client';
import auth from "solid-auth-client";
import MediaLoader from "../../utils/MediaLoader";
import {v1 as uuidv1} from 'uuid';

type Props = { webId: String };

class CreateRoute extends React.Component {

    constructor({webId}: Props) {
        super();
        this.webID = webId.replace("profile/card#me", "");
        console.log(this.webID);
        this.handleSave = this.handleSave.bind(this);
        this.title = React.createRef();
        this.description = React.createRef();
        this.img = React.createRef();
        this.ImgFile = '';
        this.PhotoURL = '';

    }

    state = {points: []};

    callbackFunction = (childData) => {
        this.setState({points: childData})
    };

    async handleSave(event) {

        if (this.title.current.value.length === 0) {
            alert("La ruta tiene que tener un titulo.")
        } else if (this.state.points.length === 0) {
            alert("No ha marcado ningún punto en el mapa.")
        } else {
            let descripcion;
            if (this.description.current.value.length === 0) {
            } else {
                descripcion = this.description.current.value;
            }
            this.ImgFile = this.img.current.files[0];
            if (this.img.current.files[0] !== undefined) {
                this.PhotoURL = this.webID + "viade/resources/" + this.title.current.value;
                let loader = new MediaLoader();
                loader.saveImage(this.PhotoURL, this.ImgFile);

            }

            let route = new Route(this.title.current.value, this.state.points, descripcion);
            route.uuid=uuidv1().split("-").join("");
            route.setImg(this.PhotoURL === "" ? null : this.PhotoURL)


            let parseadoRDF = await ParserRouteToRDF.parse(route);

            console.log(parseadoRDF);

            //SUBIR AL POD

            const url = this.webID + "public/viade/routes/" + route.uuid+".ttl";
            const fc = new FC(auth);
            await fc.createFile(url, parseadoRDF, "text/turtle", {});
            alert("Ruta subida con éxito")


        }
        event.preventDefault();
    }

    handlePhotoChange(event) {
        event.preventDefault();

        if (this.img.current.files.length > 0) {

            this.ImgFile = this.img.current.value[0];
            this.PhotoURL = this.webID + "viade/resources/" + this.img.current.value[0].name;
            console.log("Datos de la img")
        }
    }

    render() {
        return (
            <RouteWrapper>
                <Header>
                    <h1 className={"text--white"}>Nueva Ruta</h1>
                    <Label>Titulo</Label>
                    <Input id="titulo" type="text" size="20" placeholder="Nueva ruta" ref={this.title}/>
                    <Label>Descripcion</Label>
                    <Input id="descripcion" type="text" size="100" placeholder="Descripcion" ref={this.description}/>
                    <Label>Sube una foto</Label>
                    <input type="file" ref={this.img} onClick={this.handle} data-testid="input-img" id="input-img"
                           accept={"image/*,video/*"} multiple/>
                    <br/>
                    <Button id="submitId" onClick={this.handleSave}> Guardar ruta </Button>
                </Header>
                <CreateMap parentCallback={this.callbackFunction}/>
            </RouteWrapper>
        );
    }
}

export default CreateRoute