import React from 'react';
import {cleanup, queryByAttribute, fireEvent, render} from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LoadFile from './addfile.component';

configure({adapter: new Adapter()});

const getById = queryByAttribute.bind(null, 'id');
const mockChange = jest.fn();
const { container } = render(
    <Router>
        <LoadFile />
    </Router>
);
const nameInput = getById(container, 'nombre');
const nameQuery = 'Nuevo nombre';
const descriptionInput = getById(container, 'descripcion');
const descriptionQuery = 'Nuev descripcion';
const fileInput = getById(container, 'file');
const mediaInput = getById(container, 'media');
const submitButton = getById(container, 'submitId');
const json = '{"type": "FeatureCollection", "features": [{"type": "Feature", "properties": {"name": "Prueba1", "description": "Description prueba 1"}, "geometry": {"type": "LineString", "coordinates": [[-5.09765625, 39.90973623453719], [3.427734375, 46.195042108660154], [14.414062499999998, 51.28940590271679]]}}]}';
const file = new File([json], "track.geojson");
const img = new File(["(⌐□_□)"], "img.png", {type: "image/png"});
const video = new File(["(⌐□_□)"], "video.mp4", {type: "video/mp4"});

afterAll(cleanup);

test('App renders without crashing', () => {
    expect(container).toBeTruthy();
});

test('render', () => {
    const wrapper = mount(<LoadFile/>);
    expect(wrapper.find(LoadFile)).toBeDefined();
});


test('Submit simulation sin file', function(){
    //reinicio
    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(descriptionInput, { target: { value: '' } });

    // Cojo el input de nombre y le meto un titulo
    expect(nameInput.value).toEqual('');
    nameInput.onChange = mockChange;
    fireEvent.change(nameInput, { target: { value: nameQuery } });

    // Cojo el input de descripcion y le meto una descripcion
    expect(descriptionInput.value).toEqual('');
    descriptionInput.onChange = mockChange;
    fireEvent.change(descriptionInput, { target: { value: descriptionQuery } });

    // Click en boton y compruebo fallo (falta el file)
    fireEvent.click(submitButton);
    expect(nameInput.value ==='').not.toBeTruthy();
});

test('Submit simulation sin nombre', function(){
    //reinicio
    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(descriptionInput, { target: { value: '' } });

    // Cojo el input de nombre y NO le meto un nombre, al final deberá fallar
    expect(nameInput.value).toEqual('');

    // Cojo el input de descripcion y le meto una descripcion
    expect(descriptionInput.value).toEqual('');
    descriptionInput.onChange = mockChange;
    fireEvent.change(descriptionInput, { target: { value: descriptionQuery } });

    // Cojo el input de file y le meto un file
    Object.defineProperty(fileInput, "files", {value: [file]});
    fireEvent.change(fileInput);

    // Click en boton y compruebo fallo (falta el nombre)
    fireEvent.click(submitButton);
    expect(nameInput.value ==='').toBeTruthy();
});

test('Submit simulation correcta', function(){
    //reinicio
    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(descriptionInput, { target: { value: '' } });

    // Cojo el input de nombre y le meto un nombre
    expect(nameInput.value).toEqual('');
    nameInput.onChange = mockChange;
    fireEvent.change(nameInput, { target: { value: nameQuery } });

    // Cojo el input de descripcion y le meto una descripcion
    expect(descriptionInput.value).toEqual('');
    descriptionInput.onChange = mockChange;
    fireEvent.change(descriptionInput, { target: { value: descriptionQuery } });

    // Cojo el input de file y le meto un file
   // Object.defineProperty(fileInput, "files", {value: [file]});
   // fireEvent.change(fileInput);

    // Cojo el input de media y le meto un media
    Object.defineProperty(mediaInput, "media", {value: [video,img]});
    fireEvent.change(mediaInput);

    // Click en boton y compruebo OK
    fireEvent.click(submitButton);
});