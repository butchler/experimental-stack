import injector from 'helpers/injector';
import { startGame } from 'constants/actions';
import { NUM_ITEMS_EASY, NUM_ITEMS_MEDIUM, NUM_ITEMS_HARD } from 'constants/config';
import { getRandomCards } from 'helpers/random';
import StartGameButtonsView from './StartGameButtonsView';

export default injector(({ store, dispatch }) => {
  const { items } = store.ui.goalLoader.goal;

  return {
    startEasy: () => dispatch(startGame(getRandomCards(NUM_ITEMS_EASY, items))),
    startMedium: () => dispatch(startGame(getRandomCards(NUM_ITEMS_MEDIUM, items))),
    startHard: () => dispatch(startGame(getRandomCards(NUM_ITEMS_HARD, items))),
  };
})(StartGameButtonsView);
