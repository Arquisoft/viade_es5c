import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { HashRouter as Router } from 'react-router-dom';
import Mapa from './map.component';

describe.only('Mapa', () => {
    afterAll(cleanup);

    const { container } = render(
        <Router>
            <Mapa/>
        </Router>
    );

    test('renders without crashing', () => {
        expect(container).toBeTruthy();
    });
});