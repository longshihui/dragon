import './app.global.scss';
import { hot } from 'react-hot-loader/root';
import React from 'react';
import { render } from 'react-dom';
import Guide from './pages/Guide';

const App = hot(Guide);

render(<App />, document.getElementById('root'));
