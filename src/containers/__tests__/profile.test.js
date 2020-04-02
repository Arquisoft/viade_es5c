import React from 'react';
import {cleanup} from 'react-testing-library';
import {configure, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Profile from '../Profile/index';

configure({adapter: new Adapter()});

describe('<Profile/>', () => {
    afterAll(cleanup);
    test('render', () => {
        const wrapper = render(<Profile/>);
        expect(wrapper.find(Profile)).toBeDefined();
    });
});