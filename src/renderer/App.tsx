import './theme/App.scss';
import { hot } from 'react-hot-loader/root';
import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import AppLayout from './components/AppLayout/index';
import RouterView from './router';

const App = hot(function () {
    return (
        <HashRouter>
            <AppLayout>
                <RouterView />
            </AppLayout>
        </HashRouter>
    );
});

render(<App />, document.getElementById('root'));
