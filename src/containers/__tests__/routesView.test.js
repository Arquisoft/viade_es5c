import React from 'react';
import {cleanup} from 'react-testing-library';
import {configure, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {RoutesView} from '../RoutesView/RoutesView';
import {RouteView} from '../RoutesView/children/RouteView';
import Route from "../../entities/Route";
import Point from "../../entities/Point";

configure({adapter: new Adapter()});

afterAll(cleanup);

const rutas = [];

function setUp() {
    const points = [];
    points.push(new Point(43.354856, -5.851450));
    points.push(new Point(43.364880, -5.851450));
    points.push(new Point(43.384900, -5.851450));

    const ruta1 = new Route("ruta1", points);
    const ruta2 = new Route("ruta2", points);
    const ruta3 = new Route("ruta3", points);
    rutas.push(ruta1);
    rutas.push(ruta2);
    rutas.push(ruta3);
}

test('render correctamente', () => {
    const wrapper = render(<RoutesView rutas={[]}/>);
    expect(wrapper.find(RoutesView)).toBeDefined();
    //expect(true).toBeTruthy();
});

test('render correctamente con rutas vacio', () => {
    const wrapper = render(<RoutesView rutas={rutas}/>);
    expect(wrapper.find(RoutesView)).toBeDefined();
    //expect(true).toBeTruthy();
});

test('render correctamente con rutas lleno', () => {
    setUp();
    const wrapper = render(<RoutesView rutas={rutas}/>);
    expect(wrapper.find(RoutesView)).toBeDefined();
    //expect(true).toBeTruthy();
});

test('Con rutas vacio, num de rutas = 0', () => {
    const wrapper = render(<RoutesView rutas={rutas}/>);
    expect(wrapper.find(RouteView).length).toBe(0);
});

/*test('Con rutas lleno, num de rutas igual a rutas.length', () => {
    setUp();
    const wrapper = mount(<RoutesView rutas={rutas}/>);
    expect(wrapper.find(RouteView).length).toBe(3);
    //expect(true).toBeTruthy();
});*/
