import React from 'react';
import {cleanup} from 'react-testing-library';
import {configure, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FriendsComponent from '../Friends/index';
import {FriendCard} from '../Friends/friend.style';

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

test('render correctamente', () => {
    const wrapper = render(<FriendsComponent friends={[]}/>);
    expect(wrapper.find(FriendsComponent)).toBeDefined();
    //expect(true).toBeTruthy();
});

test('render correctamente con friends vacio', () => {
    const wrapper = render(<FriendsComponent friends={friends}/>);
    expect(wrapper.find(FriendsComponent)).toBeDefined();
    //expect(true).toBeTruthy();
});

test('render correctamente con friends lleno', () => {
    setUp();
    const wrapper = render(<FriendsComponent friends={friends}/>);
    expect(wrapper.find(FriendsComponent)).toBeDefined();
    //expect(true).toBeTruthy();
});

test('Con friends vacio, num de friends = 0', () => {
    const wrapper = render(<FriendsComponent friends={friends}/>);
    expect(wrapper.find(FriendCard).length).toBe(0);
});

/*test('Con friends lleno, num de friends igual a rutas.length', () => {
    setUp();
    const wrapper = mount(<FriendsComponent friends={friends}/>);
    expect(wrapper.find(FriendCard).length).toBe(3);
    //expect(true).toBeTruthy();
});*/