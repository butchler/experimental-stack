import { Action } from 'globals/store';
import shape, { checkShape } from 'helpers/shape';
import { v4 } from 'node-uuid';

export const init = Action('INIT');
export const addQuiz = Action('ADD_QUIZ', () =>
  ({ path: [v4()] }));
export const removeQuiz = Action('REMOVE_QUIZ',
  shape({ path: ['string'] }));
export const addQuestion = Action('ADD_QUESTION', ({ path }) => checkShape(
  { path: ['string'] },
  { path: [...path, v4()] }
));
export const removeQuestion = Action('REMOVE_QUESTION',
  shape({ path: ['string'] }));
export const setQuestionText = Action('SET_QUESTION_TEXT',
  shape({ path: ['string'], text: 'string' }));
export const addAnswer = Action('ADD_ANSWER', ({ path }) => checkShape(
  { path: ['string'] },
  { path: [...path, v4()] }
));
export const removeAnswer = Action('REMOVE_ANSWER',
  shape({ path: ['string'] }));
export const setAnswerText = Action('SET_ANSWER_TEXT',
  shape({ path: ['string'], text: 'string' }));
export const toggleAnswerIsCorrect = Action('TOGGLE_ANSWER_IS_CORRECT',
  shape({ path: ['string'] }));
