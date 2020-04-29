import React, {Fragment} from 'react';
import {NotLoggedInLayout, PrivateLayout, PublicLayout} from '@layouts';
import {HashRouter as Router, Redirect, Switch} from "react-router-dom";

import {
    AddFile,
    AddRoute,
    FriendRoute,
    Friends,
    Login,
    PageNotFound,
    Profile,
    Register,
    RegistrationSuccess,
    RoutesList,
    ShareRoute,
    Welcome
} from './containers';

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
        id: 'friends',
        path: '/friends/listFriends',
        component: Friends
    },
    {
        id: 'addRoute',
        path: '/routes/addRoute',
        component: AddRoute
    },
    {
        id: 'listRoutes',
        path: '/routes/listRoutes',
        component: RoutesList
    },
    {
        id: 'addFile',
        path: '/routes/addFile',
        component: AddFile
    },
    {
        id: 'shareRoute',
        path: '/routes/shareRoute',
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
