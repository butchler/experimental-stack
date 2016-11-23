import { Record, List, Map } from 'immutable';
import { Reducer } from 'globals/store';
import subscribe from 'helpers/subscribe';
import { removeQuiz, addQuestion, removeQuestion } from 'constants/actions';
import QuizView from './QuizView';

const State = Record({ quizzes: Map() });
const Quiz = Record({ questionIds: List(['first']) });

export const quizzesReducer = Reducer(State(), [
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

export default subscribe(
  quizzesReducer,
  { addQuestion, removeQuiz },
  // TODO: Maybe use a getPath function instead of a mapStateAndPropsToProps function?
  ({ quizzes }, { path }) => quizzes.getIn(path, Quiz())
)(QuizView);
