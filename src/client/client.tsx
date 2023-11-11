import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import Application from './containers/application';

const root = document.getElementById('root');

if (root) {
  {
    ReactDOM.render((
      //Предоставляет доступ к Redux Store
      <Provider store={ store }>
          <HashRouter>
              <Application />
          </HashRouter>
      </Provider>
    ), root);
  } 
}