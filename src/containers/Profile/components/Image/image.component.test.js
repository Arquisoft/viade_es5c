import React from 'react';
import {cleanup} from 'react-testing-library';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Image} from './image.component';
import {ImageProfile} from '@components';

configure({adapter: new Adapter()});

describe('Image>', () => {
    afterAll(cleanup);
    test('render', () => {
        const wrapper = mount(<Image webId={'https://viadees5c.solid.community/profile/card#me'}/>);
        expect(wrapper.find(ImageProfile)).toBeDefined();
    });
});