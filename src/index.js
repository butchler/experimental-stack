import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import AppStore from 'stores/AppStore';
import App from 'components/App';

const store = new AppStore();

window.actions = [];
function dispatch(action) {
  window.actions.push(action);
  store.dispatch(action);
}

ReactDOM.render(
  <Provider store={store} dispatch={dispatch}>
    <App />
  </Provider>,
  document.getElementById('app-container')
);
