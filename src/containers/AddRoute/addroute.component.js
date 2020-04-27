import React from 'react';
import {Button, Header, Input, Label, RouteWrapper} from "./addroute.style";
import {CreateMap} from "../../components";
import {ParserRouteToRDF} from "../../parseo";
import Route from "../../entities/Route"
import Media from "../../entities/Media"
import FC from 'solid-file-client';
import auth from "solid-auth-client";
import MediaLoader from "../../utils/MediaLoader";
import {v1 as uuidv1} from 'uuid';
import {errorToaster,successToaster} from '@utils';
import i18n from '../../i18n';

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
        this.media = [];
        this.PhotoURL = '';
    }
    
    state = {points: []};

    callbackFunction = (childData) => {
        this.setState({points: childData})
    };

    reset(){
        this.media = [];
        this.PhotoURL = '';
        this.state.points=[];
        this.title.current.value='';
        this.description.current.value='';

    }

    async handleSave(event) {

        if (this.title.current.value.length === 0) {
            errorToaster(i18n.t('addFile.errorNoName'), 'Error', {
            });
        } else if (this.state.points.length === 0) {
            errorToaster(i18n.t('addFile.errorNopuntos'), 'Error', {
            });
        } else {
            let descripcion="";
            if (this.description.current.value.length === 0) {
            } else {
                descripcion = this.description.current.value;
            }

            
            /*
            this.ImgFile = this.img.current.files[0];
            if (this.img.current.files[0] !== undefined) {
                this.PhotoURL = this.webID + "viade/resources/" + this.title.current.value;
                let loader = new MediaLoader();
                loader.saveImage(this.PhotoURL, this.ImgFile);

            }
            */
            const path_resources=this.webID.split("profile/card#me")[0] + "viade2Prueba1/resources/";
            let loader = new MediaLoader();
            let route = new Route(this.title.current.value, this.state.points, descripcion);
            route.uuid=uuidv1().split("-").join("");
            //route.setImg(this.PhotoURL === "" ? null : this.PhotoURL)
            for(var i=0;i<this.img.current.files.length;i++){
                let extension="."+this.img.current.files[i].name.split(".").slice(-1)[0];
                let urlMedia=uuidv1().split("-").join("")+extension;
                //Subir la media
                        
                loader.saveImage(path_resources+urlMedia, this.img.current.files[i],this.img.current.files[i].type);
                if (this.img.current.files[i].type.split("/")[0]==="image"){
                        route.media.push(new Media(path_resources+urlMedia,this.webID,new Date(),"image"));
                }
                if (this.img.current.files[i].type.split("/")[0]==="video"){
                    route.media.push(new Media(path_resources+urlMedia,this.webID,new Date(),"video"));
                }
            }

            let parseadoRDF = await ParserRouteToRDF.parse(route);

            console.log(parseadoRDF);

            //SUBIR AL POD

            const url = this.webID + "public/viade/routes/" + route.uuid+".ttl";
            const fc = new FC(auth);
            await fc.createFile(url, parseadoRDF, "text/turtle", {});
            successToaster(i18n.t('addFile.uploadGood','Great'));
            this.reset();
            

        }
        event.preventDefault();
    }

    handleMedia(event){
        
        let z=0;
        for (var i=0;i<event.target.files.length;i++){
            if (event.target.files[i].type.split("/")[0]!=="image" && event.target.files[i].type.split("/")[0]!=="video"){
                z++;
            }
        }
        if (z===0){

        }else{
            event.target.value=null;
            errorToaster(i18n.t('addFile.errorMedia'), 'Error', {
            });
        }
        
        
    }

    

    render() {
        return (
            <RouteWrapper>
                <Header>
                    <h1 className={"text--white"}>{i18n.t('addFile.nuevaRuta')}</h1>
                    <Label>{i18n.t('addFile.nombre')}</Label>
                    <Input id="titulo" type="text" size="20" placeholder="Nueva ruta" ref={this.title}/>
                    <Label>{i18n.t('addFile.descripcion')}</Label>
                    <Input id="descripcion" type="text" size="100" placeholder="Descripcion" ref={this.description}/>
                    <Label>{i18n.t('addFile.anadirMedia')}</Label>
                    <input type="file" ref={this.img} onChange={this.handleMedia} data-testid="input-img" id="input-img"
                           accept={"image/*,video/*"} multiple/>
                    <br/>
                    <Button id="submitId" onClick={this.handleSave}>{i18n.t('addFile.saveRoute')}</Button>
                </Header>
                <CreateMap id="map" parentCallback={this.callbackFunction}/>
            </RouteWrapper>
        );
    }
}

export default CreateRoute