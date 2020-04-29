import React from 'react';
import {cleanup, render} from 'react-testing-library';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {FriendPage} from './friendComponent';
import {Friend} from './components/Entity/friend';
import FriendsComponent from './index';
import {BrowserRouter as Router} from "react-router-dom";

configure({adapter: new Adapter()});

afterAll(cleanup);

const friends = [];

function setUp() {
    var friend1 = {
        "webId": "friendWebId1",
        "name": "name1",
        "image": "image1"
    };
    var friend2 = {
        "webId": "friendWebId2",
        "name": "name2",
        "image": "image2"
    };
    var friend3 = {
        "webId": "friendWebId3",
        "name": "name3",
        "image": "image3"
    };
    friends.push(friend1);
    friends.push(friend2);
    friends.push(friend3);
}

const {container} = render(
    <Router>
        <FriendsComponent webId={'https://viadees5c.solid.community/profile/card#me'}/>
    </Router>
);

test('render', () => {
    expect(container).toBeTruthy();
});

test('render correctamente', () => {
    const wrapper = mount(<FriendPage friends={[]}/>);
    expect(wrapper.find(FriendPage)).toBeDefined();
});

test('render correctamente con friends vacio', () => {
    const wrapper = mount(<FriendPage friends={friends}/>);
    expect(wrapper.find(Friend).length).toBe(0);
});

test('render correctamente con friends lleno', () => {
    setUp();
    const wrapper = mount(<FriendPage friends={friends}/>);
    expect(wrapper.find(Friend).length).toBe(3);
});
