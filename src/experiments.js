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
    <Component />
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

export default subscribe(quizListReducer, [addQuiz, removeQuiz])(QuizListView);

// Quiz.js
import { Record, List, Map } from 'immutable';
import { Reducer } from 'globals/store';
import { addQuiz, removeQuiz, addQuestion, removeQuestion } from 'constants/actions';
import subscribe from 'helpers/subscribe';
import QuizView from './QuizView';

const State = Record({ quizzes: Map() });
const Quiz = Record({ questionIds: List() });

export const quizzesReducer = Reducer(State(), [
  [addQuiz, (state, id) => state.setIn(['quizzes', id], Quiz({ questionIds: List([`${id}-first`]) }))],
  [removeQuiz, (state, id) => state.removeIn(['quizzes', id])],
  [addQuestion, (state, { quizId, questionId }) => state.updateIn(['quizzes', quizId],
    quiz => quiz.questionIds.push(questionId))],
  [removeQuestion, (state, { quizId, questionId }) => state.updateIn(['quizzes', quizId],
    quiz => quiz.questionIds.filter(id => id !== questionId))],
]);

export default subscribe(quizzesReducer, null, ({ quizzes }, { id }) => quizzes.get(id))(QuizView);

// Question.js
import { Record, List, Map } from 'immutable';
import { Reducer } from 'globals/store';
import { addQuiz, removeQuiz, addQuestion, removeQuestion } from 'constants/actions';
import { quizzesReducer } from 'components/Quiz';
import subscribe from 'helpers/subscribe';
import QuestionView from './QuestionView';

const State = Record({ questions: Map(), quizzes: null, prevQuizzes: null });
const Question = Record({ text: '', answerIds: List() });

export const questionsReducer = Reducer(State(), [
  // Add a blank question for each questionId in the added quiz.
  [addQuiz, (state, id) => state.set('questions', state.questions.merge(
    state.quizzes.get(id).questionIds.map(questionId => [questionId, Question()])
  ))],
  // Save references to the current and previous set of quizzes.
  [quizzesReducer, (state, quizzes) => state.merge({
    quizzes,
    prevQuizzes: state.quizzes,
  })],
  // Remove all questions that belonged to the removed quiz.
  [removeQuiz, (state, id) => state.set('questions', state.questions.withMutations(questions => {
    const removedQuiz = state.prevQuizzes.get(id);
    removedQuiz.questionIds.forEach(questionId => questions.remove(questionId));
  }))],
  [addQuestion, (state, { questionId }) => state.setIn(['questions', questionId], Question())],
  [removeQuestion, (state, { questionId }) => state.removeIn(['questions', questionId])],
]);

export default subscribe(questionsReducer, null, ({ questions }, { id }) => questions.get(id))(QuestionView);

// Answer.js
const State = Record({ answers: Map() });
const Answer = Record({ text: '', isCorrectAnswer: false });

export const answersReducer(State(), [
  [addAnswer, (state, id) => state.set(id, Answer())],
  [removeAnswer, (state. id) => state.remove(id)],
]);

export default subscribe(answersReducer, null, ({ answers }, { id }) => answers.get(id))(AnswerView);

// TODO: Try to make answer state nested.
