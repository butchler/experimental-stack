import { Record, List, Map } from 'immutable';
import { Reducer } from 'globals/store';
import subscribe from 'helpers/subscribe';
import {
  removeQuiz, removeQuestion, addAnswer, removeAnswer, setQuestionText,
} from 'constants/actions';
import QuestionView from './QuestionView';

const State = Record({ quizzes: Map() });
const Question = Record({ text: '', answerIds: List() });

export const questionsReducer = Reducer(State(), [
  [removeQuiz, (state, id) => state.removeIn(['quizzes', id])],
  [removeQuestion, (state, { quizId, questionId }) => state.removeIn(['quizzes', quizId, questionId])],
  [addAnswer, (state, { quizId, questionId, answerId }) => state.updateIn(
    ['quizzes', quizId, questionId],
    Question(),
    question => question.update('answerIds', ids => ids.push(answerId))
  )],
  [removeAnswer, (state, { quizId, questionId, answerId }) => state.updateIn(
    ['quizzes', quizId, questionId, 'answerIds'],
    List(),
    ids => ids.filter(id => id !== answerId)
  )],
  [setQuestionText, (state, { quizId, questionId, text }) => state.updateIn(
    ['quizzes', quizId, questionId],
    Question(),
    question => question.set('text', text)
  )],
]);

export default subscribe(
  questionsReducer,
  {
    addAnswer,
    removeAnswer: ({ quizId, questionId }, answerId) =>
      removeAnswer({ quizId, questionId, answerId }),
    setQuestionText: ({ quizId, questionId }, text) =>
      setQuestionText({ quizId, questionId, text }),
    removeQuestion,
  },
  ({ quizzes }, { quizId, questionId }) =>
    quizzes.getIn([quizId, questionId], Question())
)(QuestionView);
