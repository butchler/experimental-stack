/* global window, document */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduceApp from 'reducers/app';
import App from 'components/App';
import { setLanguage } from 'constants/actions';
import { DEFAULT_LANGUAGE } from 'constants/i18n';

// Initialize store.
window.actions = [];
const actionLogger = () => next => (action) => {
  window.actions.push(action);
  return next(action);
};

const appStore = createStore(reduceApp, applyMiddleware(actionLogger));

// Set language to the user's default.
appStore.dispatch(setLanguage(
  window.navigator.language ||
  window.navigator.userLanguage ||
  DEFAULT_LANGUAGE.code
));

// Begin rendering UI.
ReactDOM.render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.getElementById('app-container')
);
