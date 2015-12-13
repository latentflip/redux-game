import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'andlog';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Game from './containers/Game';
import './styles/main.styl';

import Config from 'config';
logger.log('Config.env:', Config.env);

const store = configureStore();

ReactDOM.render((
  <Provider store={store}>
    <Game />
  </Provider>
), document.querySelector('#root'));
