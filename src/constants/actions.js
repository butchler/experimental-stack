import { action, shape } from 'helpers/actions';

export const setLanguage = action('SET_LANGUAGE', shape('string'));
export const setGoalItems = action('SET_GOAL_ITEMS', shape(
  [{ cue: 'string', response: 'string' }]
));
export const setGoalError = action('SET_GOAL_ERROR', shape('string'));
export const startGame = action('START_GAME', shape({
  items: [{ cue: 'string', response: 'string' }],
  cards: [{ itemIndex: 'number', side: 'string' }],
}));
export const quitGame = action('QUIT_GAME');
export const showResults = action('SHOW_RESULTS');
export const flipCard = action('FLIP_CARD', shape('number'));
export const unflipCards = action('UNFLIP_CARDS');
export const updateGameTimer = action('UPDATE_GAME_TIMER', shape('number'));
