import { connect } from 'react-redux';
import { startGame } from 'constants/actions';
import { NUM_ITEMS_EASY, NUM_ITEMS_MEDIUM, NUM_ITEMS_HARD } from 'constants/config';
import getRandomCards from 'helpers/random';
import { START_GAME_BUTTONS } from 'reducers/app';
import StartGameButtonsView from './StartGameButtonsView';

export function reduceStartGameButtons(items) {
  return { items };
}

export default connect(
  state => state[START_GAME_BUTTONS],
  { startGame },
  ({ items }, { startGame }) => ({
    startEasy: () => startGame(getRandomCards(NUM_ITEMS_EASY, items)),
    startMedium: () => startGame(getRandomCards(NUM_ITEMS_MEDIUM, items)),
    startHard: () => startGame(getRandomCards(NUM_ITEMS_HARD, items)),
  })
)(StartGameButtonsView);
