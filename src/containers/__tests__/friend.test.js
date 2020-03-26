import React from 'react';
import {cleanup, render} from 'react-testing-library';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FriendsComponent from '../Friends/index';

configure({adapter: new Adapter()});

describe('<FriendsComponent/>', () => {
    afterAll(cleanup);
    test('render', () => {
        const wrapper = shallow(<FriendsComponent/>);
        expect(wrapper.find(FriendsComponent)).toBeDefined();
    });
});