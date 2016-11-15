import { Record, List, Map } from 'immutable';
import { Reducer } from 'globals/store';
import subscribe from 'helpers/subscribe';
import { removeQuiz, addQuestion, removeQuestion } from 'constants/actions';
import QuizView from './QuizView';

const State = Record({ quizzes: Map() });
const Quiz = Record({ questionIds: List(['first']) });

export const quizzesReducer = Reducer(State(), [
  [removeQuiz, (state, id) => state.removeIn(['quizzes', id])],
  [addQuestion, (state, { quizId, questionId }) => state.updateIn(
    ['quizzes', quizId],
    Quiz(),
    quiz => quiz.update('questionIds', ids => ids.push(questionId))
  )],
  [removeQuestion, (state, { quizId, questionId }) => state.updateIn(
    ['quizzes', quizId],
    Quiz(),
    quiz => quiz.update('questionIds', ids => ids.filter(id => id !== questionId))
  )],
]);

export default subscribe(
  quizzesReducer,
  {
    addQuestion: (payload, { quizId }) => addQuestion({ quizId }),
  },
  ({ quizzes }, { quizId }) => quizzes.get(quizId, Quiz())
)(QuizView);
