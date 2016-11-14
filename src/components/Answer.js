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
  [removeQuiz, (state, id) => state.removeIn(['quizzes', id])],
  [removeQuestion, (state, { quizId, questionId }) => state.removeIn(['quizzes', quizId, questionId])],
  [removeAnswer, (state, { quizId, questionId, answerId }) => state.removeIn(
    ['quizzes', quizId, questionId, answerId]
  )],
  [setAnswerText, (state, { quizId, questionId, answerId, text }) => state.updateIn(
    ['quizzes', quizId, questionId, answerId],
    Answer(),
    answer => answer.set('text', text)
  )],
  [toggleAnswerIsCorrect, (state, { quizId, questionId, answerId }) => state.updateIn(
    ['quizzes', quizId, questionId, answerId],
    Answer(),
    answer => answer.update('isCorrect', isCorrect => !isCorrect)
  )],
]);

export default subscribe(
  answersReducer,
  { setAnswerText, toggleAnswerIsCorrect },
  ({ quizzes }, { quizId, questionId, id }) => quizzes.getIn([quizId, questionId, id], Answer())
)(AnswerView);
