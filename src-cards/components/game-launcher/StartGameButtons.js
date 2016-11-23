import { Record } from 'immutable';
import { Reducer, subscriber } from 'globals/store';
import { startGame, setGoalItems } from 'constants/actions';
import { NUM_ITEMS_EASY, NUM_ITEMS_MEDIUM, NUM_ITEMS_HARD } from 'constants/config';
import getRandomCards from 'helpers/random';
import StartGameButtonsView from './StartGameButtonsView';

import { setGoalItems, setGoalError } from 'constants/actions';
export const startGameButtonsReducer = Reducer('StartGameButtons', State(), [
  // TODO: Maybe depend on another reducer instead of handling the action.
  [setGoalItems, (state, goalItems) => state.set('goalItems', goalItems)],
]);

export default subscriber(startGameButtonsReducer, {
  actions: {
    // TODO: Merge state into props passed to dispatchers.
    startEasy: ({ items }) => startGame(getRandomCards(NUM_ITEMS_EASY, items)),
    startMedium: ({ items }) => startGame(getRandomCards(NUM_ITEMS_MEDIUM, items)),
    startHard: ({ items }) => startGame(getRandomCards(NUM_ITEMS_HARD, items)),
  },
})(StartGameButtonsView);
