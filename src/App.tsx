import 'typeface-roboto/index.css';
import { hot } from 'react-hot-loader/root';
import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import AppConfig from './AppConfig';

const App = hot(function() {
  return (
    <Router>
      <Switch>
        {AppConfig.map(config => {
          return (
            <Route
              path={config.pathname}
              component={config.component}
              key={config.id}
            />
          );
        })}
        <Route component={Home} />
      </Switch>
    </Router>
  );
});

render(<App />, document.getElementById('root'));
