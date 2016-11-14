import { Action } from 'globals/store';
import shape from 'helpers/shape';

export default {
  init: Action('INIT'),
  addQuiz: Action('ADD_QUIZ', shape('string')),
  removeQuiz: Action('REMOVE_QUIZ', shape('string')),
  addQuestion: Action('ADD_QUESTION', shape({ quizId: 'string', questionId: 'string' })),
  removeQuestion: Action('REMOVE_QUESTION', shape({ quizId: 'string', questionId: 'string' })),
  setQuestionText: Action('SET_QUESTION_TEXT', shape({
    quizId: 'string', questionId: 'string', text: 'string',
  })),
  addAnswer: Action('ADD_ANSWER', shape({
    quizId: 'string', questionId: 'string', answerId: 'string',
  })),
  removeAnswer: Action('REMOVE_ANSWER', shape({
    quizId: 'string', questionId: 'string', answerId: 'string',
  })),
  setAnswerText: Action('SET_ANSWER_TEXT', shape({
    quizId: 'string', questionId: 'string', answerId: 'string', text: 'string',
  })),
  toggleAnswerIsCorrect: Action('TOGGLE_ANSWER_IS_CORRECT', shape({
    quizId: 'string', questionId: 'string', answerId: 'string',
  })),
};
