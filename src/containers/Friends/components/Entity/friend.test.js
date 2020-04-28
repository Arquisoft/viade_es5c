import React from 'react';
import {cleanup} from 'react-testing-library';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Friend} from './friend';

configure({adapter: new Adapter()});

afterAll(cleanup);

var friend1 = {
    "webId": "https://viadees5c.solid.community/profile/card#me",
    "name": "viadees5c",
    "image": "image1"
};


test('render', () => {
    const wrapper = mount(<Friend friend={friend1}/>);
    expect(wrapper.find(Friend)).toBeDefined();
});

