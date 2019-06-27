import './app.global.scss';
import { hot } from 'react-hot-loader/root';
import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
// 页面
import Home from './pages/home';
import DevelopTools from './pages/develop-tools';

const App = hot(function() {
  return (
    <Router>
      <Switch>
        <Route path="/develop-tools" component={DevelopTools} />
        <Route component={Home} />
      </Switch>
    </Router>
  );
});

render(<App />, document.getElementById('root'));
