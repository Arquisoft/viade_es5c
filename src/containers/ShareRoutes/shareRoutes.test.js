import React from 'react';
import {cleanup, fireEvent, render} from 'react-testing-library';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateShareRoute from "./children/shareroutes.component";

configure({adapter: new Adapter()});

afterAll(cleanup);

test('render', () => {
    const wrapper = shallow(<CreateShareRoute/>);
    expect(wrapper.find(CreateShareRoute)).toBeDefined();
});

test('test compruebo datos', () => {
    const values = {routeWebID: "routeWebID", friendWebID: "friendWebID"};

    const {getByLabelText} = render(<CreateShareRoute/>);

    const inputroutewebId = getByLabelText('Route\'s webID:');
    const inputfriendwebId = getByLabelText('Insert your friend\'s webID:');

    fireEvent.change(inputroutewebId, {target: {value: values.routeWebID}});
    fireEvent.change(inputfriendwebId, {target: {value: values.friendWebID}});

    expect(inputroutewebId.value).toEqual('routeWebID');
    expect(inputfriendwebId.value).toEqual('friendWebID');
});

test('test basico relleno formulario', () => {
    const values = {routeWebID: "routeWebID", friendWebID: "friendWebID"};

    const {getByLabelText, wrapper} = render(<CreateShareRoute/>);

    const inputroutewebId = getByLabelText('Route\'s webID:');
    const inputfriendwebId = getByLabelText('Insert your friend\'s webID:');

    fireEvent.change(inputroutewebId, {target: {value: values.routeWebID}});
    fireEvent.change(inputfriendwebId, {target: {value: values.friendWebID}});

    //const getByType = queryByAttribute.bind(null, 'type');
    //const boton = getByType(wrapper, 'submit');
    //fireEvent.click(boton);
    expect(true).toBeTruthy();
});
