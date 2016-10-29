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
const actionLogger = () => (next) => (action) => {
  window.actions.push(action);
  window.localStorage.actions = JSON.stringify(window.actions);
  return next(action);
};

window.reset = () => {
  delete window.localStorage.actions;
  window.location.reload();
};

const appStore = createStore(reduceApp, applyMiddleware(actionLogger));

// Set language to the user's default.
appStore.dispatch(setLanguage(
  window.navigator.language ||
  window.navigator.userLanguage ||
  DEFAULT_LANGUAGE.code
));

// Replay saved actions.
//try {
  //const previousActions = JSON.parse(window.localStorage.actions);
  //window.actions = previousActions;
  //previousActions.forEach(action => appStore.dispatch(action));
//} catch (error) {
  //console.log('Error parsing previous actions:', error);
//}


// Begin rendering UI.
ReactDOM.render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.getElementById('app-container')
);
