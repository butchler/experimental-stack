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
window.store = store;
function dispatch(action) {
  window.actions.push(action);
  localStorage.actions = JSON.stringify(actions);
  store.dispatch(action);
}

function reset() {
  delete localStorage.actions;
  window.location.reload();
}
window.reset = reset;

// Replay previous actions.
try {
  const previousActions = JSON.parse(localStorage.actions);
  window.actions = previousActions;
  previousActions.forEach(action => store.dispatch(action));
} catch (error) {
  console.log('Error parsing previous actions:', error);
}

// Set language to the default if it has not been set already.
if (!store.ui.currentLanguage) {
  dispatch(setLanguage(
    window.navigator.language ||
    window.navigator.userLanguage ||
    DEFAULT_LANGUAGE.code
  ));
}

ReactDOM.render(
  <Provider store={store} dispatch={dispatch}>
    <App />
  </Provider>,
  document.getElementById('app-container')
);
