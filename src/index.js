/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import {createBrowserHistory} from 'history';
import {Provider} from 'mobx-react';

import {injectHistory} from './routes';
import * as serviceWorker from './serviceWorker';

import App from './app';
import './locale';
import './index.less';

const history = createBrowserHistory();
const routing = injectHistory(history);

const wrappedApp = (
  <Provider routing={routing}>
    <Router history={history}>
      <App/>
    </Router>
  </Provider>
);

ReactDOM.render(wrappedApp, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
