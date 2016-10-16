/* global window */
import { withTasks, task, call, callMethod, delay } from 'react-task';
import injector from 'helpers/injector';
import playUrl from 'helpers/audio';
import { SELECTION_DELAY } from 'constants/config';
import { unflipCards, updateGameTimer, quitGame } from 'constants/actions';
import GameView from './GameView';

export default injector(({ store, dispatch }) => ({
  // For view
  timeElapsed: store.game.timer.timeElapsedString,
  numAttempts: store.game.numAttempts,
  cards: store.game.cards,
  onQuit: () => dispatch(quitGame()),
  // For tasks
  firstCard: store.game.firstCardSelected,
  secondCard: store.game.secondCardSelected,
  lastItemMatched: store.game.lastItemMatched,
  unflip: () => dispatch(unflipCards()),
  updateTimer: ms => dispatch(updateGameTimer(ms)),
}))(
  withTasks(mapPropsToTasks)(GameView)
);

// Asynchronous tasks
function mapPropsToTasks({ unflip, firstCard, secondCard, updateTimer, lastItemMatched }) {
  return [
    firstCard && secondCard && task(unflipCardsAfterDelay, {
      key: `${firstCard.id}-${secondCard.id}`,
      unflip,
    }),
    task(tickTimer, { updateTimer }),
    // TODO: Task to preload sounds.
    lastItemMatched && task(playItemSound, { key: lastItemMatched.id, item: lastItemMatched }),
  ];
}

function* unflipCardsAfterDelay(getProps) {
  yield call(delay, SELECTION_DELAY);
  getProps().unflip();
}

function* tickTimer(getProps) {

  while (true) { // eslint-disable-line no-constant-condition
    const tickStart = yield callMethod(window.performance, 'now');
    yield call(delay, 100);
    const tickEnd = yield callMethod(window.performance, 'now');
    const millisecondsElapsed = tickEnd - tickStart;
    getProps().updateTimer(millisecondsElapsed);
  }
}

function* playItemSound(getProps) {
  const { item } = getProps();

  if (item.sound) {
    yield call(playUrl, item.sound);
  }
}
