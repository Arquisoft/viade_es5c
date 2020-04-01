import React from 'react';
import {cleanup} from 'react-testing-library';
import {configure, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateShareRoute from "../ShareRoutes/children/shareroutes.component";

configure({adapter: new Adapter()});

afterAll(cleanup);

test('render', () => {
    const wrapper = render(<CreateShareRoute/>);
    expect(wrapper.find(CreateShareRoute)).toBeDefined();
});

test('render2', () => {
    const wrapper = render(<CreateShareRoute/>);
    expect(wrapper.find(CreateShareRoute)).toBeDefined();
});
