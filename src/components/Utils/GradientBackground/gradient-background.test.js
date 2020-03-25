import React from 'react';
import {cleanup, render} from 'react-testing-library';
import GradientBackground from './gradient-background.component';

afterAll(cleanup);

const { container } = render(<GradientBackground />);

describe('GradientBackground', () => {
  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
