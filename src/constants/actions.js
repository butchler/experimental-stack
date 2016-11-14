import { Action } from 'globals/store';
import shape from 'helpers/shape';

export const init = Action('INIT');
export const addQuiz = Action('ADD_QUIZ', shape('string'));
export const removeQuiz = Action('REMOVE_QUIZ', shape('string'));
export const addQuestion = Action('ADD_QUESTION', shape({
  quizId: 'string', questionId: 'string',
}));
export const removeQuestion = Action('REMOVE_QUESTION', shape({
  quizId: 'string', questionId: 'string',
}));
export const setQuestionText = Action('SET_QUESTION_TEXT', shape({
  quizId: 'string', questionId: 'string', text: 'string',
}));
export const addAnswer = Action('ADD_ANSWER', shape({
  quizId: 'string', questionId: 'string', answerId: 'string',
}));
export const removeAnswer = Action('REMOVE_ANSWER', shape({
  quizId: 'string', questionId: 'string', answerId: 'string',
}));
export const setAnswerText = Action('SET_ANSWER_TEXT', shape({
  quizId: 'string', questionId: 'string', answerId: 'string', text: 'string',
}));
export const toggleAnswerIsCorrect = Action('TOGGLE_ANSWER_IS_CORRECT', shape({
  quizId: 'string', questionId: 'string', answerId: 'string',
}));
