import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import PRTemplate from './modules/PRTemplate';
import WorkTimeControl from './modules/WorkTimeControl/index';

export default function routerView() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/pr-template" exact component={PRTemplate} />
            <Route
                path="/work-time-control"
                exact
                component={WorkTimeControl}
            />
        </Switch>
    );
}
