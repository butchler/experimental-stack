import { observer, inject } from 'mobx-react';
import { startGame } from 'constants/actions';
import { NUM_ITEMS_EASY, NUM_ITEMS_MEDIUM, NUM_ITEMS_HARD } from 'constants/config';
import { getRandomCards } from 'helpers/random';
import StartGameButtonsView from 'components/StartGameButtonsView';

export default inject(({ dispatch }) => {
  const { items } = store.ui.goalLoader.goal;

  return {
    startEasy: () => dispatch(startGame(getRandomCards(NUM_ITEMS_EASY, items))),
    startMedium: () => dispatch(startGame(getRandomCards(NUM_ITEMS_MEDIUM, items))),
    startHard: () => dispatch(startGame(getRandomCards(NUM_ITEMS_HARD, items))),
  };
})(observer(StartGameButtonsView));
