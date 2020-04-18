import 'typeface-roboto/index.css';
import { hot } from 'react-hot-loader/root';
import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import AppConfig from './AppConfig';
import AppLayout from './components/AppLayout/index';
import './theme/App.scss';

const App = hot(function () {
    return (
        <HashRouter>
            <AppLayout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    {AppConfig.map(config => {
                        return (
                            <Route
                                path={config.path}
                                component={config.component}
                                exact={config.exact}
                                key={config.id}
                            />
                        );
                    })}
                </Switch>
            </AppLayout>
        </HashRouter>
    );
});

render(<App />, document.getElementById('root'));
