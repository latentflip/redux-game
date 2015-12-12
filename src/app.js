import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'andlog';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import './styles/main.styl';

import Config from 'config';
logger.log('Config.env:', Config.env);

import { Router } from 'react-router';
import { createHistory } from 'history';
import routes from './routes';

const history = createHistory();
const store = configureStore();


ReactDOM.render((
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
), document.querySelector('#root'));


