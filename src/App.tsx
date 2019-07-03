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
    </Router>
  );
});

render(<App />, document.getElementById('root'));
