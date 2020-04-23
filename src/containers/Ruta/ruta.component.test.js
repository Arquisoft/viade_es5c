import React from 'react';
import {cleanup} from 'react-testing-library';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Ruta from './ruta.component';

configure({adapter: new Adapter()});

afterAll(cleanup);

test('render correctamente', () => {
    const wrapper = mount(<Ruta/>);
    expect(wrapper.find(Ruta)).toBeDefined();
});