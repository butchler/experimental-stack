/* global window, document */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import AppStore from 'stores/AppStore';
import App from 'components/App';
import { setLanguage } from 'constants/actions';
import { DEFAULT_LANGUAGE } from 'constants/i18n';

const store = new AppStore();

window.actions = [];
function dispatch(action) {
  window.actions.push(action);
  store.dispatch(action);
}

// Set language.
dispatch(setLanguage(
  window.navigator.language ||
  window.navigator.userLanguage ||
  DEFAULT_LANGUAGE.code
));

ReactDOM.render(
  <Provider store={store} dispatch={dispatch}>
    <App />
  </Provider>,
  document.getElementById('app-container')
);
