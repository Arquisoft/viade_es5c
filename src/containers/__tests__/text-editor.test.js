import React from 'react';
import {cleanup, render} from 'react-testing-library';
import {HashRouter as Router} from 'react-router-dom';
import TextEditor from '../TextEditor/text-editor.component';

describe('Text Editor', () => {
    afterAll(cleanup);

    const {container} = render(
        <Router>
            <TextEditor/>
        </Router>
    );

    test('App renders without crashing', () => {
        expect(container).toBeTruthy();
    });
});
