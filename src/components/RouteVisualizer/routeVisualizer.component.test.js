import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { HashRouter as Router } from 'react-router-dom';
import RouteVisualizer from './RouteVisualizer.component';

describe.only('RouteVisualizer', () => {
    afterAll(cleanup);

    const { container } = render(
        <Router>
            <RouteVisualizer/>
        </Router>
    );

    test('renders without crashing', () => {
        expect(container).toBeTruthy();
    });
});