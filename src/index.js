/* global window, document */
import React from 'react';
import ReactDOM from 'react-dom';
import { dispatch, getState, getActions, finalizeStore } from 'globals/store';
import QuizList from 'components/QuizList';
import { init } from 'constants/actions';

window.getState = getState;
window.getActions = getActions;

finalizeStore();

dispatch(init());

ReactDOM.render(
  <QuizList />,
  document.getElementById('app-container')
);
