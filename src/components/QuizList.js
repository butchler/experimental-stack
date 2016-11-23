import { Record, List } from 'immutable';
import { Reducer } from 'globals/store';
import subscribe from 'helpers/subscribe';
import { addQuiz, removeQuiz } from 'constants/actions';
import QuizListView from './QuizListView';

const State = Record({ quizIds: List() });

export const quizListReducer = Reducer(State(), [
  [addQuiz, (state, { path: [quizId] }) => state.set('quizIds', state.quizIds.push(quizId))],
  [removeQuiz, (state, { path: [quizId] }) =>
    state.set('quizIds', state.quizIds.filter(id => id !== quizId))],
]);

export default subscribe(
  quizListReducer,
  { addQuiz }
)(QuizListView);
