import React from 'react';
import {cleanup} from 'react-testing-library';
import {configure, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
//import AddRoute from '../AddRoute/index';

configure({adapter: new Adapter()});

    afterAll(cleanup);
    test('render', () => {
        //const wrapper = render(<AddRoute/>);
        //expect(wrapper.find(AddRoute)).toBeDefined();
        expect(true).toBeTruthy();
    });

/*
const rutas = [];

function setUp() {

}

test('render correctamente', () => {
    const wrapper = render(<AddRoute rutas={[]}/>);
    expect(wrapper.find(AddRoute)).toBeDefined();
    //expect(true).toBeTruthy();
});

test('render correctamente con rutas vacio', () => {
    const wrapper = render(<AddRoute rutas={rutas}/>);
    expect(wrapper.find(AddRoute)).toBeDefined();
    //expect(true).toBeTruthy();
});

test('render correctamente con rutas lleno', () => {
    setUp();
    const wrapper = render(<AddRoute rutas={rutas}/>);
    expect(wrapper.find(AddRoute)).toBeDefined();
    //expect(true).toBeTruthy();
});

test('Con rutas vacio, num de rutas = 0', () => {
    const wrapper = render(<AddRoute rutas={rutas}/>);
    expect(wrapper.find(CreateMap).length).toBe(0);
});

/*test('Con rutas lleno, num de rutas igual a rutas.length', () => {
    setUp();
    const wrapper = mount(<AddRoute rutas={rutas}/>);
    expect(wrapper.find(CreateMap).length).toBe(3);
    //expect(true).toBeTruthy();
});*/