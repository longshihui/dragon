import './theme/App.scss';
import 'typeface-roboto/index.css';
import { hot } from 'react-hot-loader/root';
import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Work from './pages/Work';
import AppLayout from './components/AppLayout/index';

const App = hot(function () {
    return (
        <HashRouter>
            <AppLayout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/work" exact component={Work} />
                </Switch>
            </AppLayout>
        </HashRouter>
    );
});

render(<App />, document.getElementById('root'));
