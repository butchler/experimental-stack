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

const reducers = new ReducerSet();
export default reducers;

import reducers from 'globals/reducers';
import subscribe from 'helpers/subscribe';
const actionList = reducers.add(
  ['actionType1', 'actionType2'],
  (state = [], action) => state.push(action)
);
subscribe(actionList)(Component);

import reducers from 'globals/reducers';
import subscribe from 'helpers/subscribe';
subscribe(reducers.add(
  ['actionType1', 'actionType2'],
  (state = [], action) => state.push(action)
))(Component);

import reducers from 'globals/reducers';

function actionList(state = [], action) {
  if (action.type === 'actionType1' || action.type === 'actionType2') {
    return state.push(action);
  }
}

actionList.actionTypes = ['actionType1', 'actionType2'];

import reducers from 'globals/reducers';

const append = (state, action) => state.push(action);
reducers.add({
  initialState: [],
  handlers: {
    [action1]: append,
    [action2]: append,
  },
});

// components/component.js
import { subscribe } from 'globals/store';
import ComponentView from './ComponentView';

const appendAction = (state, action) => state.push(action);

export default subscribe({
  initialState: [],
  handlers: {
    [action1]: appendAction,
    [action2]: appendAction,
  },
})(ComponentView);








// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'globals/store';
import Provider from 'helpers/Provider';
import Component from 'components/component';
import { init } from 'constants/actions';

const store = createStore();

store.dispatch(init());

ReactDOM.render(
  <Provider store={store}>
    <Component />
  </Provider>
);

// globals/subscriptions.js
import Store from 'helpers/Store';

export default new Store();

// components/component.js
import { subscribe } from 'globals/store';
import createReducer from 'helpers/createReducer';
import ComponentView from './ComponentView';
import { action1, action2, myAction, globalAction } from 'constants/actions';

const appendAction = (state, action) => state.push(action);

export const reducer = createReducer([], {
  [action1]: appendAction,
  [action2]: appendAction,
});

subscribe(reducer, {
  myAction: (payload, props) => myAction({ payload, id: props.id }),
  globalAction,
}, (state, props) => state[props.id])(ComponentView);

// helpers/Store.js
export default class Store {
  subscribe(reducer, actionCreators, mapStateAndPropsToProps) {
    // TODO
  }

  createStore() {
    // TODO
  }
}

// helpers/Provider.js
import React, { Component, PropTypes } from 'react';

export default class Provider extends Component {
}

// helpers/createReducer.js
export default function createReducer(initialState, actionHandlers) {
  // TODO
}


// QuizList.js
export const quizListReducer = createReducer(
  { lastId: 0, quizIds: [] }, {
  [addQuiz]: ({ lastId, quizIds }) => ({
    lastId: lastId + 1,
    quizIds: [...quizIds, lastId + 1],
  }),
  [removeQuiz]: ({ lastId, quizIds }, id) => ({
    lastId,
    quizIds: quizIds.filter(quizId => quizId !== id),
  }),
});

// Quiz.js
export const quizzesReducer = createReducer(
  {},
  { quizList: quizListReducer }, {
  [addQuiz]: (quizzes, _, { quizList }) => ({ ...quizzes, [quizList.lastId]: { questions: [0] } }),
  [removeQuiz]: (quizzes, id) => {
    const clone = { ...quizzes };
    delete clone[id];
    return clone;
  },
});
