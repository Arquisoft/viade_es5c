import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Prueba2 from '../Prueba2';

describe('Prueba2', () => {

    it('has an h2 tag', () => {
        const component = ReactTestUtils.renderIntoDocument(<Prueba2/>);
        var h2 = ReactTestUtils.findRenderedDOMComponentWithTag(
            component, 'h2'
        );
    });

    it('has a title class', () => {
        const component = ReactTestUtils.renderIntoDocument(<Prueba2/>);
        var node = ReactTestUtils.findRenderedDOMComponentWithClass(
            component, 'title'
        );
    });
});