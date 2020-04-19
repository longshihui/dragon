import React, { Fragment } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import PRTemplate from './PRTemplate';

export default function Work() {
    const { path } = useRouteMatch();

    return (
        <Fragment>
            工作类组件
            <Switch>
                <Route
                    path={`${path}/pr-template`}
                    component={PRTemplate}
                    exact
                />
            </Switch>
        </Fragment>
    );
}
