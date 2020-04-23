import { render, cleanup } from 'react-testing-library';
import Select from './select.component';

afterAll(cleanup);

describe('Select', () => {
    it('renders without crashing', () => {
        expect(render(Select)).toBeTruthy();
    });
});