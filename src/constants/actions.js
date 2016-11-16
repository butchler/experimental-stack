import { Action } from 'globals/store';
import shape, { checkShape } from 'helpers/shape';
import { v4 } from 'node-uuid';

export const init = Action('INIT');
export const addQuiz = Action('ADD_QUIZ', () => ({ quizId: v4() }));
export const removeQuiz = Action('REMOVE_QUIZ', shape({ quizId: 'string' }));
export const addQuestion = Action('ADD_QUESTION', ({ quizId }) =>
  checkShape(
    { quizId: 'string' },
    { quizId, questionId: v4() }
  )
);
export const removeQuestion = Action('REMOVE_QUESTION', shape({
  quizId: 'string', questionId: 'string',
}));
export const setQuestionText = Action('SET_QUESTION_TEXT', shape({
  quizId: 'string', questionId: 'string', text: 'string',
}));
export const addAnswer = Action('ADD_ANSWER', ({ quizId, questionId }) =>
  checkShape(
    { quizId: 'string', questionId: 'string' },
    { quizId, questionId, answerId: v4() }
  )
);
export const removeAnswer = Action('REMOVE_ANSWER', shape({
  quizId: 'string', questionId: 'string', answerId: 'string',
}));
export const setAnswerText = Action('SET_ANSWER_TEXT', shape({
  quizId: 'string', questionId: 'string', answerId: 'string', text: 'string',
}));
export const toggleAnswerIsCorrect = Action('TOGGLE_ANSWER_IS_CORRECT', shape({
  quizId: 'string', questionId: 'string', answerId: 'string',
}));
