import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Work from './pages/Work';
import PRTemplate from './pages/Work/PRTemplate';
import WorkTimeControl from './pages/WorkTimeControl/index';

export default function routerView() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/work" exact component={Work} />
            <Route path="/work/pr-template" exact component={PRTemplate} />
            <Route
                path="/work-time-control"
                exact
                component={WorkTimeControl}
            />
        </Switch>
    );
}
