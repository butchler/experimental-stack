/* global window, document */
import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStore from 'globals/store';
import Provider from 'helpers/Provider';
import QuizList from 'components/QuizList';
import { init } from 'constants/actions';

const store = GlobalStore.createStoreInstance();
window.getState = store.getReducerStates;

store.dispatch(init());

ReactDOM.render(
  <Provider store={store}>
    <QuizList />
  </Provider>,
  document.getElementById('app-container')
);
