import React from 'react';
import {cleanup, render} from 'react-testing-library';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddFile from '../AddFile/index';

configure({adapter: new Adapter()});

describe('<AddFile/>', () => {
    afterAll(cleanup);
    test('render', () => {
        const wrapper = shallow(<AddFile/>);
        expect(wrapper.find(AddFile)).toBeDefined();
    });
});