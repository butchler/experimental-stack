// index.js
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
  </Provider>
);

// globals/store.js
import Store from 'helpers/Store';

export default new Store();

// helpers/Store.js
export default class Store {
  Reducer(initialState, actionHandlers) {
    // TODO
  }

  Action(type, mapArgsToPayload) {
    // TODO
  }

  createStoreInstance() {
    // TODO
  }
}

// helpers/Provider.js
import React, { Component, PropTypes } from 'react';

export default class Provider extends Component {
  // TODO
}

// helpers/subscribe.js
export default function subscribe(reducer, actions, mapStateAndPropsToProps) {
  // TODO
}

// QuizList.js
import { Record, List } from 'immutable';
import { Reducer } from 'globals/store';
import { addQuiz, removeQuiz } from 'constants/actions';
import subscribe from 'helpers/subscribe';
import QuizListView from './QuizListView';

const State = Record({ quizIds: List() });

export const quizListReducer = Reducer(State(), {
  [addQuiz]: (state, id) => state.set('quizIds', state.quizIds.push(id)),
  [removeQuiz]: (state, id) => state.set('quizIds', state.quizIds.filter(quizId => quizId !== id)),
});

export default subscribe(
  quizListReducer,
  { addQuiz, removeQuiz }
)(QuizListView);

// Quiz.js
import { Record, List, Map } from 'immutable';
import { Reducer } from 'globals/store';
import { addQuiz, removeQuiz, addQuestion, removeQuestion } from 'constants/actions';
import subscribe from 'helpers/subscribe';
import QuizView from './QuizView';

const State = Record({ quizzes: Map() });
const Quiz = Record({ questionIds: List() });

export const quizzesReducer = Reducer(State(), [
  [addQuiz, (state, id) => state.setIn(['quizzes', id], Quiz({ questionIds: List(['first']) }))],
  [removeQuiz, (state, id) => state.removeIn(['quizzes', id])],
  [addQuestion, (state, { quizId, questionId }) => state.updateIn(
    ['quizzes', quizId],
    Quiz(),
    quiz => quiz.questionIds.push(questionId)
  )],
  [removeQuestion, (state, { quizId, questionId }) => state.updateIn(
    ['quizzes', quizId],
    Quiz(),
    quiz => quiz.questionIds.filter(id => id !== questionId)
  )],
]);

export default subscribe(
  quizzesReducer,
  { addQuestion, removeQuestion },
  ({ quizzes }, { id }) => quizzes.get(id, Quiz())
)(QuizView);

// Question.js
import { Record, List, Map } from 'immutable';
import { Reducer } from 'globals/store';
import { addQuiz, removeQuiz, addQuestion, removeQuestion } from 'constants/actions';
import { quizzesReducer } from 'components/Quiz';
import subscribe from 'helpers/subscribe';
import QuestionView from './QuestionView';

const State = Record({ quizzes: Map(), });
const Question = Record({ text: '', answerIds: List() });

export const questionsReducer = Reducer(State(), [
  [removeQuiz, (state, id) => state.removeIn(['quizzes', id])],
  //[addQuestion, (state, { quizId, questionId }) => state.setIn(['quizzes', quizId, questionId], Question())],
  [removeQuestion, (state, { quizId, questionId }) => state.removeIn(['quizzes', quizId, questionId])],
  [addAnswer, (state, { quizId, questionId, answerId }) => state.updateIn(
    ['quizzes', quizId, questionId],
    Question(),
    question => question.updateIn('answerIds', ids => ids.push(answerId))
  )],
  [removeAnswer, (state, { quizId, questionId, answerId }) => state.updateIn(
    ['quizzes', quizId, questionId, 'answerIds'],
    List(),
    ids => ids.filter(id => id != answerId)
  )],
]);

export default subscribe(
  questionsReducer,
  { addAnswer, removeAnswer },
  ({ quizzes }, { quizId, id }) => quizzes.getIn([quizId, id], Question())
)(QuestionView);

// Answer.js
const State = Record({ quizzes: Map() });
const Answer = Record({ text: '', isCorrectAnswer: false });

export const answersReducer(State(), [
  [removeQuiz, (state, id) => state.removeIn(['quizzes', id])],
  [removeQuestion, (state, { quizId, questionId }) => state.removeIn(['quizzes', quizId, questionId])],
  //[addAnswer, (state, { quizId, questionId, answerId }) => state.setIn(['quizzes', quizId, questionId, answerId], Answer())],
  [removeAnswer, (state. { quizId, questionId, answerId }) => state.removeIn(['quizzes', quizId, questionId, answerId])],
]);

export default subscribe(
  answersReducer,
  null,
  ({ answers }, { quizId, questionId, id }) => quizzes.getIn([quizId, questionId, id], Answer())
)(AnswerView);
