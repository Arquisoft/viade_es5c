import React from 'react';
import {cleanup, fireEvent, queryByAttribute, render} from 'react-testing-library';
import {BrowserRouter as Router} from 'react-router-dom';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateRoute from './addroute.component';
import CreateMap from "../../components/MapCreate/Map";
import {RoutesList} from "../RoutesView/RoutesList";
import {RoutesView} from "../RoutesView/RoutesView";

configure({adapter: new Adapter()});

const getById = queryByAttribute.bind(null, 'id');
const webId = 'https://viadees5c.solid.community/profile/card#me';
const mockChange = jest.fn();
const {container} = render(
    <Router>
        <CreateRoute webId={webId}/>
    </Router>
);
const nameInput = getById(container, 'titulo');
const nameQuery = 'Nuevo titulo de ruta';
const descriptionInput = getById(container, 'descripcion');
const descriptionQuery = 'Nueva descripcion de la ruta';
const imgInput = getById(container, 'input-img');
const img = new File(["(⌐□_□)"], "img.png", {type: "image/png"});
const mapa = getById(container, 'map');
const submitButton = getById(container, 'submitId');

afterAll(cleanup);

test('App renders without crashing', () => {
    expect(container).toBeTruthy();
});

test('render correctamente con enzyme', () => {
    const wrapper = mount(<CreateRoute webId={webId}/>);
    expect(wrapper.find(CreateRoute)).toBeDefined();
    expect(wrapper.find(CreateMap)).toBeDefined();
});

test('Inputs render correctamente', async () => {
    expect(nameInput).not.toBe(null);
    expect(descriptionInput).not.toBe(null);
    expect(imgInput).not.toBe(null);
});

test('Input name changes value', async () => {
    expect(nameInput.value).toEqual('');
    nameInput.onChange = mockChange;

    fireEvent.change(nameInput, {target: {value: nameQuery}});
    expect(nameInput.value).toEqual('Nuevo titulo de ruta');
});

test('Input description changes value', async () => {
    expect(descriptionInput.value).toEqual('');
    descriptionInput.onChange = mockChange;

    fireEvent.change(descriptionInput, {target: {value: descriptionQuery}});
    expect(descriptionInput.value).toEqual('Nueva descripcion de la ruta');
});

test('Submit simulation con errores', function () {
    //reinicio
    fireEvent.change(nameInput, {target: {value: ''}});
    fireEvent.change(descriptionInput, {target: {value: ''}});

    // Cojo el input de titulo y le meto un titulo
    expect(nameInput.value).toEqual('');
    nameInput.onChange = mockChange;
    fireEvent.change(nameInput, {target: {value: nameQuery}});

    // Cojo el input de descripcion y le meto una descripcion
    expect(descriptionInput.value).toEqual('');
    descriptionInput.onChange = mockChange;
    fireEvent.change(descriptionInput, {target: {value: descriptionQuery}});

    // Click en boton, falla porque falta el mapa
    fireEvent.click(submitButton);
    expect(nameInput.value).not.toEqual('');
});

test('Submit simulation', function () {
//reinicio
    fireEvent.change(nameInput, {target: {value: ''}});
    fireEvent.change(descriptionInput, {target: {value: ''}});

    // Cojo el input de titulo y le meto un titulo
    expect(nameInput.value).toEqual('');
    nameInput.onChange = mockChange;
    fireEvent.change(nameInput, {target: {value: nameQuery}});

    // Cojo el input de descripcion y le meto una descripcion
    expect(descriptionInput.value).toEqual('');
    descriptionInput.onChange = mockChange;
    fireEvent.change(descriptionInput, {target: {value: descriptionQuery}});

    // Cojo el input de file y le meto un file
    Object.defineProperty(imgInput, "files", {value: [img]});
    fireEvent.change(imgInput);

    // Cojo el mapa y selecciono los distintos puntos
    var points = {points: [[-5.09765625,39.90973623453719],[3.427734375,46.195042108660154],[14.414062499999998,51.28940590271679]]};
    let wrapper = mount(<CreateRoute webId={webId}/>);
    let instance = wrapper.instance();

    instance.render();
    instance.callbackFunction(points);
    expect(instance.state.points).toBeTruthy();

    render(<CreateMap sendData={instance.callbackFunction(points)} />);

    // Click en boton, OK
    fireEvent.click(submitButton);
    expect(nameInput.value).not.toEqual('');
});
