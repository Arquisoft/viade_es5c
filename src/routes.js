import React, {Fragment} from 'react';
import {NotLoggedInLayout, PrivateLayout, PublicLayout} from '@layouts';
import {HashRouter as Router, Redirect, Switch} from "react-router-dom";

import {
    AddFile,
    FormModelConverter,
    FormModelRenderer,
    Friends,
    Login,
    PageNotFound,
    Profile,
    Register,
    RegistrationSuccess,
    TextEditor,
    AddRoute,
    Welcome, ShareRoute

} from './containers';
import {Rutas} from "./parseo"
import FriendRoute from "./containers/FriendRoutes/friendroute.component";

const privateRoutes = [
    {
        id: 'welcome',
        path: '/welcome',
        component: Welcome
    },
    {
        id: 'profile',
        path: '/profile',
        component: Profile
    },
    {
        id: 'text-editor',
        path: '/text-editor',
        component: TextEditor
    },
    {
        id: 'formmodelconverter',
        path: '/formmodel/converter',
        component: FormModelConverter
    },
    {
        id: 'formmodelrenderer',
        path: '/formmodel/renderer',
        component: FormModelRenderer
    },
    {
        id: 'listRoutes',
        path: '/listRoutes',
        component: Rutas
    },
    {
        id: 'addFile',
        path: '/addFile',
        component: AddFile

    },
    {
        id: 'friends',
        path: '/friends',
        component: Friends

    },
    {
        id: 'addRoute',
        path: '/addRoute',
        component: AddRoute

    },
    {
        id: 'shareRoute',
        path: '/shareRoute',
        component: ShareRoute
    },
    {
        id: 'friendRoute',
        path: '/friendRoute',
        component: FriendRoute
    }


];

const Routes = () => (
    <Router>
        <Fragment>
            <Switch>
                <NotLoggedInLayout component={Login} path="/login" exact/>
                <NotLoggedInLayout component={Register} path="/register" exact/>
                <NotLoggedInLayout path="/register/success" component={RegistrationSuccess} exact/>
                <PublicLayout path="/404" component={PageNotFound} exact/>
                <Redirect from="/" to="/welcome" exact/>
                <PrivateLayout path="/" routes={privateRoutes}/>
                <Redirect to="/404"/>
            </Switch>
        </Fragment>
    </Router>
);

export default Routes;
