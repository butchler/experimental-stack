import { Record, Map } from 'immutable';
import { Reducer } from 'globals/store';
import subscribe from 'helpers/subscribe';
import {
  removeQuiz, removeQuestion, removeAnswer, setAnswerText, toggleAnswerIsCorrect,
} from 'constants/actions';
import AnswerView from './AnswerView';

const State = Record({ quizzes: Map() });
const Answer = Record({ text: '', isCorrect: false });

export const answersReducer = Reducer(State(), [
  [removeQuiz, (state, { path: [quizId] }) => state.removeIn(['quizzes', quizId])],
  [removeQuestion, (state, { path: [quizId, questionId] }) =>
    state.removeIn(['quizzes', quizId, questionId])],
  [removeAnswer, (state, { path: [quizId, questionId, answerId] }) => state.removeIn(
    ['quizzes', quizId, questionId, answerId]
  )],
  [setAnswerText, (state, { path: [quizId, questionId, answerId], text }) => state.updateIn(
    ['quizzes', quizId, questionId, answerId],
    Answer(),
    answer => answer.set('text', text)
  )],
  [toggleAnswerIsCorrect, (state, { path: [quizId, questionId, answerId] }) => state.updateIn(
    ['quizzes', quizId, questionId, answerId],
    Answer(),
    answer => answer.update('isCorrect', isCorrect => !isCorrect)
  )],
]);

export default subscribe(
  answersReducer,
  {
    setAnswerText: ({ path }, text) => setAnswerText({ path, text }),
    toggleAnswerIsCorrect,
    removeAnswer,
  },
  ({ quizzes }, { path }) => quizzes.getIn(path, Answer())
)(AnswerView);
