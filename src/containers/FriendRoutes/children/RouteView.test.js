import React from 'react';
import Popup from "reactjs-popup";
import {cleanup, render, queryByAttribute, fireEvent} from 'react-testing-library';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {RouteView} from './RouteView';
import Route from "../../../entities/Route";
import Point from "../../../entities/Point";
import {HashRouter as Router} from "react-router-dom";
import {RouteVisualizer} from "../../../components/RouteVisualizer/RouteVisualizer.component";
import Media from "../../../entities/Media";

configure({adapter: new Adapter()});

afterAll(cleanup);

var rutas = [];
var points = [];
var medias = [];

medias.push(new Media('url1', 'autor1',1, 'image'));
medias.push(new Media('url2', 'autor2',1, 'video'));

points.push(new Point(43.354856, -5.851450));
points.push(new Point(43.364880, -5.851450));
points.push(new Point(43.384900, -5.851450));

rutas.push(new Route("ruta1", points));
rutas.push(new Route("ruta2", points));
rutas.push(new Route("ruta3", points));

rutas[0].setMedia(medias);
rutas[1].setMedia(medias);
rutas[2].setMedia(medias);

const data = {ruta:rutas};
const getById = queryByAttribute.bind(null, 'id');
const {container} = render(
    <Router>
        <RouteView data={data} />
    </Router>
);
const botonVerRuta = getById(container, 'verRuta');
const botonMediaRuta = getById(container, 'mediaRuta');

test('renders without crashing', () => {
    expect(container).toBeTruthy();
});

test('render correctamente con arrays llenos', () => {
    const wrapper = mount(<RouteView data={data} />);
    expect(wrapper.find(RouteView)).toBeDefined();
    expect(wrapper.find(Popup).length).toBe(2);
});

test('click en visualizar ruta', () => {
    const wrapper = mount(<RouteView data={data} />);
    expect(wrapper.find(RouteView)).toBeDefined();
    expect(wrapper.find(Popup).length).toBe(2);
    fireEvent.click(botonVerRuta);
    expect(wrapper.find(RouteVisualizer)).toBeDefined();
    expect(RouteVisualizer).toBeTruthy();
});

test('click en ver media', () => {
    const wrapper = mount(<RouteView data={data} />);
    expect(wrapper.find(RouteView)).toBeDefined();
    expect(wrapper.find(Popup).length).toBe(2);
    fireEvent.click(botonMediaRuta);
});