import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';

import Home from './pages/Home';
import About from './pages/About';

export default (
  <Route path='/' component={App}>
  <Route path='about' component={About} />
    <IndexRoute component={Home} />
  </Route>
);
