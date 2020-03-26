import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Prueba from '../components/Prueba';

describe('Prueba', () => {

    it('has an h2 tag', () => {
        const component = ReactTestUtils.renderIntoDocument(<Prueba/>);
        var h2 = ReactTestUtils.findRenderedDOMComponentWithTag(
            component, 'h2'
        );
    });

    it('has a title class', () => {
        const component = ReactTestUtils.renderIntoDocument(<Prueba/>);
        var node = ReactTestUtils.findRenderedDOMComponentWithClass(
            component, 'title'
        );
    });
});