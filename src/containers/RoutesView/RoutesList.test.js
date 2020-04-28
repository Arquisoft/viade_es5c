import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {cleanup, render} from 'react-testing-library';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {RoutesList} from "./RoutesList";
import {RoutesView} from "./RoutesView";

configure({ adapter: new Adapter() });

describe('Route list', () => {
    afterAll(cleanup);

    const { container } = render(
        <Router>
            <RoutesList webId={'https://viadees5c.solid.community/profile/card#me'}/>
        </Router>
    );

    test('App renders without crashing', () => {
        expect(container).toBeTruthy();
    });

    test('Route Map mount', () => {
        var prevProps = {webId:'https://viadees5c.solid.community/profile/card#me'};
        let wrapper = mount(<RoutesList webId={'https://viadees5c.solid.community/profile/card#me'} />);
        let instance = wrapper.instance();

        instance.render();
        instance.componentDidMount();
        instance.componentDidUpdate(prevProps);
        expect(instance.state.rutas).toBeTruthy();
        expect(instance.state.friends).toBeTruthy();

        render(<RoutesView rutas={instance.state.rutas} friends={instance.state.friends} />)

    })

});