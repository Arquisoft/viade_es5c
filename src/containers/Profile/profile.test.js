import React from 'react';
import {cleanup} from 'react-testing-library';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Profile from './index';
import {Image} from './components/Image/image.component';

configure({adapter: new Adapter()});

describe('<Profile/>', () => {
    afterAll(cleanup);
    test('render', () => {
        const wrapper = mount(<Profile webId={'https://viadees5c.solid.community/profile/card#me'}/>);
        expect(wrapper.find(Image)).toBeDefined();
    });
});