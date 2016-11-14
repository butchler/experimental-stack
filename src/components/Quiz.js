import { Record, List, Map } from 'immutable';
import { Reducer } from 'globals/store';
import subscribe from 'helpers/subscribe';
import { addQuiz, removeQuiz, addQuestion, removeQuestion } from 'constants/actions';
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
