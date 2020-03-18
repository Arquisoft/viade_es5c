import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { successToaster, errorToaster } from '@utils';
import Route from 'Route'
import ldflex from '@solid/query-ldflex';
import {
  TextEditorWrapper,
  TextEditorContainer,
  Header,
  Form,
  FullGridSize,
  Label,
  Input,
  TextArea,
  WebId
} from './addroute.style';

export const AddRoute = ({ webId }: Props) => {
  const errors = [false, false, false, false];
  const values = ["R01","",100,5];

  function checkName(event) {
    values[0] = event.target.value.trim();
    if(event.target.value.trim() === ""){
      errorToaster("Error");
      errors[0] = true;
    } else{
      errors[0] = false;
    }
  }
  function checkDescription(event){
    values[1] = event.target.value;
  }
  function checkRank(event) {
    values[3] = event.target.value;
    if(Number.parseInt(event.target.value) < Number.parseInt(event.target.min) 
      || Number.parseInt(event.target.value) > Number.parseInt(event.target.max)) {
      errorToaster("La valoración debe de estar entre 0 y 10");
      errors[3] = true;
    } else{
      errors[3] = false;
    }
  }
  async function checkSubmit(event){
    event.preventDefault();
    if(errors.includes(true)){
      errorToaster("El nombre no puede estar vacío");
    } else {
      let name = values[0];
      let description = values[1];
      let distance = 0;
      let rank = values[3];
      let createdAt = new Date();
      const route = new Route();
      route.setName(name);
      route.setDescription(description);
      route.setDistance(distance);
      route.setRank(rank);
      route.setDate(createdAt);
      console.log(route);
    }
  }

  return (
    <Form onSubmit={checkSubmit}>
      <FullGridSize>
        <WebId>
          <Label>
            Conectado a:
          </Label>
            <b>
              <a href={webId}>{webId}</a>
            </b>  
        </WebId>
      </FullGridSize>
      <FullGridSize>
        <Label>
          Nombre: 
          <Input type="text" size="200" defaultValue="R01" onBlur={checkName} />
        </Label>
        <Label>
          Descripción: 
          <TextArea onChange={checkDescription} cols={40} rows={10} />
        </Label>
        <Label>
          Valoración: 
          <Input type="number" min="0" max="10" defaultValue={5} onBlur={checkRank} size="200"/>
        </Label>
        <Input type="submit" className="ids-link-filled ids-link-filled--primary button" value="Añadir" />   
      </FullGridSize>
    </Form>
  );
};

const AddRouteComponent = ({ webId }: Props) => {
  const { t } = useTranslation();
  return (
    <TextEditorWrapper>
      <TextEditorContainer>
        <Header>
          <p>Crea una nueva ruta</p>
        </Header>
        <AddRoute webId={webId} />
      </TextEditorContainer>
    </TextEditorWrapper>
  );
};

export default AddRouteComponent;