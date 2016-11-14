import { Record, List } from 'immutable';
import { Reducer } from 'globals/store';
import subscribe from 'helpers/subscribe';
import { addQuiz, removeQuiz } from 'constants/actions';
import QuizListView from './QuizListView';

const State = Record({ quizIds: List() });

export const quizListReducer = Reducer(State(), [
  [addQuiz, (state, id) => state.set('quizIds', state.quizIds.push(id))],
  [removeQuiz, (state, id) => state.set('quizIds', state.quizIds.filter(quizId => quizId !== id))],
]);

export default subscribe(
  quizListReducer,
  { addQuiz, removeQuiz }
)(QuizListView);
