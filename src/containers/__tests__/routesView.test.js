import React from 'react';
import {cleanup, render} from 'react-testing-library';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RoutesView from '../RoutesView/RoutesView';

configure({adapter: new Adapter()});

describe('<RoutesView/>', () => {
    afterAll(cleanup);
    test('render', () => {
        const wrapper = shallow(<RoutesView/>);
        expect(wrapper.find(RoutesView)).toBeDefined();
    });
});