import React from 'react';
import {cleanup, queryByAttribute, fireEvent, render} from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LoadFile from './addfile.component';
import RouteVisualizer from "../../components/RouteVisualizer/RouteVisualizer.component";

configure({adapter: new Adapter()});

const getById = queryByAttribute.bind(null, 'id');
const { container } = render(
    <Router>
        <LoadFile />
    </Router>
);

afterAll(cleanup);

test('App renders without crashing', () => {
    expect(container).toBeTruthy();
});

test('render', () => {
    const wrapper = mount(<LoadFile/>);
    expect(wrapper.find(LoadFile)).toBeDefined();
});

test('render correctamente con enzyme', () => {
    const wrapper = mount(<LoadFile files={[]}/>);
    expect(wrapper.find(LoadFile)).toBeDefined();
});

it('Submit simulation', function(){
    // Cojo el input de file y le meto un mock
    const fileInput = getById(container, 'file');
    const mockChange = jest.fn();
    fileInput.onChange = mockChange;

    // Click en boton y compruebo que existe el routerVisualizer
    const submitButton = getById(container, 'submitId');
    fireEvent.click(submitButton);
    expect(RouteVisualizer).toBeTruthy();

    const wrapper = mount(<LoadFile/>);
    expect(wrapper.find(RouteVisualizer)).toBeDefined();
});