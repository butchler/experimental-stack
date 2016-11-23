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
  [setQuestionText, (state, { path: [quizId, questionId, text] }) => state.updateIn(
    ['quizzes', quizId, questionId],
    Question(),
    question => question.set('text', text)
  )],
]);

export default subscribe(
  questionsReducer,
  {
    addAnswer,
    removeAnswer: ({ path }, answerId) => removeAnswer({ path: [...path, answerId] }),
    setQuestionText: ({ path }, text) => setQuestionText({ path, text }),
    removeQuestion,
  },
  ({ quizzes }, { path }) => quizzes.getIn(path, Question())
)(QuestionView);

/*
import { set, setIfNot, update, remove } from 'helpers/mutators';

export const questionsReducer = Reducer(State(), [
  [removeQuiz, (state, id) => remove(['quizzes', id])],
  [removeQuestion, (state, { quizId, questionId }) => remove(['quizzes', quizId, questionId])],
  [addAnswer, (state, { quizId, questionId, answerId }) => [
    setIfNot(['quizzes', quizId, questionId], Question()),
    update(['quizzes', quizId, questionId, 'answerIds'], ids => ids.push(answerId)),
  ]],
  [removeAnswer, (state, { quizId, questionId, answerId }) =>
     state.getIn(['quizzes', quizId, questionId]) &&
       update(['quizzes', quizId, questionId, 'answerIds'], ids =>
         ids.filter(id => id !== answerId))],
  [setQuestionText, (state, { quizId, questionId, text }) => [
    setIfNot(['quizzes', quizId, questionId], Question()),
    set(['quizzes', quizId, questionId, 'text'], text),
  ]],
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
  ({ quizId, questionId }) => ['quizzes', quizId, questionId],
)(QuestionView);
*/
