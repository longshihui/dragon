import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Work from './pages/Work';
import PRTemplate from './pages/Work/PRTemplate';

export default function routerView() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/work" exact component={Work} />
            <Route path="/work/pr-template" exact component={PRTemplate} />
        </Switch>
    );
}
