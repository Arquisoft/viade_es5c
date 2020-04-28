import React from 'react';
import {cleanup, render} from 'react-testing-library';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {RoutesView} from './RoutesView';
import {RouteView} from './children/RouteView';
import Route from "../../entities/Route";
import Point from "../../entities/Point";
import {HashRouter as Router} from "react-router-dom";

configure({adapter: new Adapter()});

afterAll(cleanup);

var rutas = [];
var friends = [];
var points = [];

points.push(new Point(43.354856, -5.851450));
points.push(new Point(43.364880, -5.851450));
points.push(new Point(43.384900, -5.851450));

rutas.push(new Route("ruta1", points));
rutas.push(new Route("ruta2", points));
rutas.push(new Route("ruta3", points));

const friend1 = {
    "webId": "friendWebId1",
    "name": "name1",
    "image": "image1"
};
const friend2 = {
    "webId": "friendWebId2",
    "name": "name2",
    "image": "image2"
};
const friend3 = {
    "webId": "friendWebId3",
    "name": "name3",
    "image": "image3"
};
friends.push(friend1);
friends.push(friend2);
friends.push(friend3);


const {container} = render(
    <Router>
        <RoutesView rutas={rutas} friends={friends} webId={'viadees5c'}/>
    </Router>
);

test('renders without crashing', () => {
    expect(container).toBeTruthy();
});

test('render correctamente con arrays vacios', () => {
    const wrapper = mount(<RoutesView rutas={[]} friends={[]} webId={'viadees5c'}/>);
    expect(wrapper.find(RoutesView)).toBeDefined();
    expect(wrapper.find(RouteView).length).toBe(0);
});

test('render correctamente con arrays llenos', () => {
    const wrapper = mount(<RoutesView rutas={rutas} friends={friends} webId={'viadees5c'}/>);
    expect(wrapper.find(RoutesView)).toBeDefined();
    expect(wrapper.find(RouteView).length).toBe(3);
});


