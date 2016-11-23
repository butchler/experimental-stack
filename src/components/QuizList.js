import { Record, List } from 'immutable';
import { Reducer, subscriber } from 'globals/store';
import { addQuiz, removeQuiz } from 'constants/actions';
import QuizListView from './QuizListView';

const State = Record({ quizIds: List() });

export const quizListReducer = Reducer('QuizList', State(), [
  [addQuiz, (state, { path: [quizId] }) => state.set('quizIds', state.quizIds.push(quizId))],
  [removeQuiz, (state, { path: [quizId] }) =>
    state.set('quizIds', state.quizIds.filter(id => id !== quizId))],
]);

export default subscriber(quizListReducer, {
  actions: { addQuiz },
})(QuizListView);
