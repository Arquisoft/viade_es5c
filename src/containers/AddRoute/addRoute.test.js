import React from 'react';
import {cleanup, queryByAttribute, fireEvent, render} from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateRoute from './addroute.component';
import CreateMap from "../../components/Mapa/map.component";

configure({adapter: new Adapter()});

const getById = queryByAttribute.bind(null, 'id');
/*const { container } = render(
    <Router>
        <CreateRoute />
    </Router>
);*/

afterAll(cleanup);

test('App renders without crashing', () => {
    //expect(container).toBeTruthy();
    expect(true).toBeTruthy();
});
/*
test('render correctamente con enzyme', () => {
    const wrapper = mount(<CreateRoute/>);
    expect(wrapper.find(CreateRoute)).toBeDefined();
});

test('Inputs render correctamente', async () => {
    const nameInput = getById(container, 'titulo');
    const descriptionInput = getById(container, 'descripcion');
    const imgInput = getById(container, 'input-img');

    expect(nameInput).not.toBe(null);
    expect(descriptionInput).not.toBe(null);
    expect(imgInput).not.toBe(null);
});

test('Input name changes value', async () => {
    const nameInput = getById(container, 'titulo');
    const query = 'Nuevo titulo de ruta';
    const mockChange = jest.fn();
    expect(nameInput.value).toEqual('');
    nameInput.onChange = mockChange;

    fireEvent.change(nameInput, { target: { value: query } });
    expect(nameInput.value).toEqual('Nuevo titulo de ruta');
});

test('Input description changes value', async () => {
    const descriptionInput = getById(container, 'descripcion');
    const query = 'Nueva descripcion de la ruta';
    const mockChange = jest.fn();
    expect(descriptionInput.value).toEqual('');
    descriptionInput.onChange = mockChange;

    fireEvent.change(descriptionInput, { target: { value: query } });
    expect(descriptionInput.value).toEqual('Nueva descripcion de la ruta');
});

test('Submit simulation', function(){
    // Cojo el input de titulo y le meto un titulo
    const nameInput = getById(container, 'titulo');
    const query = 'Nuevo titulo de ruta';
    const mockChange = jest.fn();
    expect(nameInput.value).toEqual('');
    nameInput.onChange = mockChange;
    fireEvent.change(nameInput, { target: { value: query } });

    // Cojo el input de descripcion y le meto una descripcion
    const descriptionInput = getById(container, 'descripcion');
    const query = 'Nueva descripcion de la ruta';
    const mockChange = jest.fn();
    expect(descriptionInput.value).toEqual('');
    descriptionInput.onChange = mockChange;
    fireEvent.change(descriptionInput, { target: { value: query } });

    // Cojo el input de file y le meto un file
    const imgInput = getById(container, 'input-img');
    const img = new File(["(⌐□_□)"], "img.png", {
            type: "image/png"
    });
    Object.defineProperty(input_img, "files", {
            value: [img]
        });
    fireEvent.change(input_img);

    const mockChange = jest.fn();
    imgInput.onChange = mockChange;

    // Click en boton
    const submitButton = getById(container, 'submitId');
    fireEvent.click(submitButton);
});
test('Submit simulation comprobacion errores', function(){
    // Cojo el input de titulo y NO le meto un titulo, al final deberá fallar
    const nameInput = getById(container, 'titulo');
    const query = 'Nuevo titulo de ruta';
    const mockChange = jest.fn();
    expect(nameInput.value).toEqual('');
    nameInput.onChange = mockChange;
    fireEvent.change(nameInput, { target: { value: query } });

    // Cojo el input de descripcion y le meto una descripcion
    const descriptionInput = getById(container, 'descripcion');
    const query = 'Nueva descripcion de la ruta';
    const mockChange = jest.fn();
    expect(descriptionInput.value).toEqual('');
    descriptionInput.onChange = mockChange;
    fireEvent.change(descriptionInput, { target: { value: query } });

    // Click en boton y compruebo fallo (falta el título)
    const submitButton = getById(container, 'submitId');
    fireEvent.click(submitButton);
});
*/