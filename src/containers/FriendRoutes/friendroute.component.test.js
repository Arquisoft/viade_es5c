import React from 'react';
import {cleanup, render} from 'react-testing-library';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FriendRoute from './friendroute.component';
import {FriendrouteContainer} from './friendroute.container';
import {RouteView} from "./children/RouteView";
import {BrowserRouter as Router} from "react-router-dom";
import Point from "../../entities/Point";
import Route from "../../entities/Route";

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
    "webId": "https://uo237133.solid.community/profile/card#me",
    "name": "name3",
    "image": "image3"
};
friends.push(friend1);
friends.push(friend2);
friends.push(friend3);

const {container} = render(
    <Router>
        <FriendrouteContainer webId={'https://viadees5c.solid.community/profile/card#me'} />
    </Router>
);

test('render', () => {
    expect(container).toBeTruthy();
    container.click()
});

test('render correctamente con friends y rutas vacio', () => {
    const wrapper = mount(<FriendRoute friends={[]} routes={[]}/>);
    expect(wrapper.find(RouteView).length).toBe(0);
});

test('render correctamente con friends lleno y rutas vacio', () => {
    const wrapper = mount(<FriendRoute friends={friends} routes={[]}/>);
    expect(wrapper.find(RouteView).length).toBe(0);
});

test('render correctamente con friends y rutas lleno', () => {
    const wrapper = mount(<FriendRoute friends={friends} routes={rutas} see={FriendRoute.getRoutesSharedWithMe}/>);
    expect(wrapper.find(RouteView).length).toBe(3);
    wrapper.find(RouteView).last().simulate('click',1)
});