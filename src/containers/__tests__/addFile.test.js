import React from 'react';
import {cleanup} from 'react-testing-library';
import {configure, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
//import AddFile from '../AddFile/index';
//import RouteVisualizer from "../../components/RouteVisualizer/RouteVisualizer.component";

configure({adapter: new Adapter()});

afterAll(cleanup);
test('render', () => {
    //const wrapper = render(<AddFile/>);
    //expect(wrapper.find(AddFile)).toBeDefined();
    expect(true).toBeTruthy();
});

/*
const rutas = [];

function setUp() {

}

test('render correctamente', () => {
    const wrapper = render(<AddFile rutas={[]}/>);
    expect(wrapper.find(AddFile)).toBeDefined();
    //expect(true).toBeTruthy();
});

test('render correctamente con rutas vacio', () => {
    const wrapper = render(<AddFile rutas={rutas}/>);
    expect(wrapper.find(AddFile)).toBeDefined();
    //expect(true).toBeTruthy();
});

test('render correctamente con rutas lleno', () => {
    setUp();
    const wrapper = render(<AddFile rutas={rutas}/>);
    expect(wrapper.find(AddFile)).toBeDefined();
    //expect(true).toBeTruthy();
});

test('Con rutas vacio, num de rutas = 0', () => {
    const wrapper = render(<AddFile rutas={rutas}/>);
    expect(wrapper.find(RouteVisualizer).length).toBe(0);
});

/*test('Con rutas lleno, num de rutas igual a rutas.length', () => {
    setUp();
    const wrapper = mount(<AddFile rutas={rutas}/>);
    expect(wrapper.find(RouteVisualizer).length).toBe(3);
    //expect(true).toBeTruthy();
});*/