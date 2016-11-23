import { Record, List, Map } from 'immutable';
import { Reducer, subscriber } from 'globals/store';
import { removeQuiz, addQuestion, removeQuestion } from 'constants/actions';
import QuizView from './QuizView';

const State = Record({ quizzes: Map() });
const Quiz = Record({ questionIds: List(['first']) });

export const quizzesReducer = Reducer('Quizzes', State(), [
  [removeQuiz, (state, { path: [quizId] }) => state.removeIn(['quizzes', quizId])],
  [addQuestion, (state, { path: [quizId, questionId] }) => state.updateIn(
    ['quizzes', quizId],
    Quiz(),
    quiz => quiz.update('questionIds', ids => ids.push(questionId))
  )],
  [removeQuestion, (state, { path: [quizId, questionId] }) => state.updateIn(
    ['quizzes', quizId],
    Quiz(),
    quiz => quiz.update('questionIds', ids => ids.filter(id => id !== questionId))
  )],
]);

export default subscriber(quizzesReducer, {
  actions: { addQuestion, removeQuiz },
  mapState: ({ quizzes }, { path }) => quizzes.getIn(path, Quiz()),
})(QuizView);
