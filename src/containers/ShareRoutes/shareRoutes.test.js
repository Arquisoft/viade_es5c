import React from 'react';
import {cleanup, queryByAttribute, fireEvent, render} from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateShareRoute from "./children/shareroutes.component";
import ShareRoute from './shareroute.const';

configure({adapter: new Adapter()});

const getById = queryByAttribute.bind(null, 'id');
const { container } = render(
    <Router>
        <CreateShareRoute />
    </Router>
);

configure({adapter: new Adapter()});
afterAll(cleanup);

test('render', () => {
    const wrapper = mount(<ShareRoute/>);
    expect(wrapper.find(ShareRoute)).toBeDefined();
});

test('render correctamente', () => {
    const wrapper = mount(<CreateShareRoute/>);
    expect(wrapper.find(CreateShareRoute)).toBeDefined();
});

test('Inputs render correctamente', async () => {
    const routeInput = getById(container, 'routeID');
    const friendInput = getById(container, 'friendID');

    expect(routeInput).not.toBe(null);
    expect(friendInput).not.toBe(null);
});

test('Input routeID changes value', async () => {
    const routeInput = getById(container, 'routeID');
    const query = 'ruta1';
    const mockChange = jest.fn();
    expect(routeInput.value).toEqual('');
    routeInput.onChange = mockChange;

    fireEvent.change(routeInput, { target: { value: query } });
    expect(routeInput.value).toEqual('ruta1');
});

test('Input friendID changes value', async () => {
    const friendInput = getById(container, 'friendID');
    const query = 'friend1';
    const mockChange = jest.fn();
    expect(friendInput.value).toEqual('');
    friendInput.onChange = mockChange;

    fireEvent.change(friendInput, { target: { value: query } });
    expect(friendInput.value).toEqual('friend1');
});

test('Submit simulation', function(){
    const mockChange = jest.fn();
    // Cojo el input de ruta y le meto un id de ruta
    const routeInput = getById(container, 'routeID');
    const queryRuta = 'ruta1';
    routeInput.onChange = mockChange;
    fireEvent.change(routeInput, { target: { value: queryRuta } });

    // Cojo el input de friend y le meto un id de friend
    const friendInput = getById(container, 'friendID');
    const queryFriend = 'friend1';
    friendInput.onChange = mockChange;
    fireEvent.change(friendInput, { target: { value: queryFriend } });

    // Click en boton
    const submitButton = getById(container, 'submitId');
    fireEvent.click(submitButton);
});