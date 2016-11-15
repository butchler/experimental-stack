/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStoreInstance } from 'globals/store';
import Provider from 'helpers/Provider';
import QuizList from 'components/QuizList';
import { init } from 'constants/actions';

const store = createStoreInstance();

store.dispatch(init());

ReactDOM.render(
  <Provider store={store}>
    <QuizList />
  </Provider>,
  document.getElementById('app-container')
);
