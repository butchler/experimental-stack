import { Record, List, Map } from 'immutable';
import { Reducer, subscriber } from 'globals/store';
import {
  removeQuiz, removeQuestion, addAnswer, removeAnswer, setQuestionText,
} from 'constants/actions';
import QuestionView from './QuestionView';

const State = Record({ quizzes: Map() });
const Question = Record({ text: '', answerIds: List() });

export const questionsReducer = Reducer('Questions', State(), [
  [removeQuiz, (state, { path: [quizId] }) => state.removeIn(['quizzes', quizId])],
  [removeQuestion, (state, { path: [quizId, questionId] }) =>
    state.removeIn(['quizzes', quizId, questionId])],
  [addAnswer, (state, { path: [quizId, questionId, answerId] }) => state.updateIn(
    ['quizzes', quizId, questionId],
    Question(),
    question => question.update('answerIds', ids => ids.push(answerId))
  )],
  [removeAnswer, (state, { path: [quizId, questionId, answerId] }) => state.updateIn(
    ['quizzes', quizId, questionId, 'answerIds'],
    List(),
    ids => ids.filter(id => id !== answerId)
  )],
  [setQuestionText, (state, { path: [quizId, questionId], text }) => state.updateIn(
    ['quizzes', quizId, questionId],
    Question(),
    question => question.set('text', text)
  )],
]);

export default subscriber(questionsReducer, {
  actions: {
    addAnswer,
    removeAnswer: ({ path }, answerId) => removeAnswer({ path: [...path, answerId] }),
    setQuestionText: ({ path }, text) => setQuestionText({ path, text }),
    removeQuestion,
  },
  mapState: ({ quizzes }, { path }) => quizzes.getIn(path, Question()),
})(QuestionView);
