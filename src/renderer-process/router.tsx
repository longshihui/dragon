import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../modules/Home';
import PRTemplate from '../modules/DirGenerator/render-process';

export default function routerView() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/pr-template" exact component={PRTemplate} />
        </Switch>
    );
}
