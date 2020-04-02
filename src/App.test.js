import React from 'react';
import {cleanup, render} from 'react-testing-library';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

configure({adapter: new Adapter()});

describe('<App/>', () => {
  afterAll(cleanup);
  test('render', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find(App)).toBeDefined();
  });
});
