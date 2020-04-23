import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { HashRouter as Router } from 'react-router-dom';
import CreateMap from './Map';

describe.only('CreateMap', () => {
    afterAll(cleanup);

    const { container } = render(
        <Router>
            <CreateMap/>
        </Router>
    );

    test('renders without crashing', () => {
        expect(container).toBeTruthy();
    });
});