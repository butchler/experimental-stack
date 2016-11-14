/* global window */
import { connect } from 'react-redux';
import { withTasks, task, delay } from 'react-task';
import playUrl from 'helpers/audio';
import { SELECTION_DELAY } from 'constants/config';
import { unflipCards, updateGameTimer, quitGame } from 'constants/actions';
import { GAME } from 'reducers/app';
import GameView from './GameView';

export function reduceGame(gameState, gameTimer) {
  return {
    ...gameState,
    timeElapsed: gameTimer.timeElapsedString,
  };
}

export default connect(
  state => state[GAME],
  { unflipCards, updateGameTimer, quitGame }
)(withTasks(mapPropsToTasks)(GameView));

// Asynchronous tasks
function mapPropsToTasks({
  unflipCards, firstCardId, secondCardId, updateGameTimer, lastItemMatched,
}) {
  return [
    firstCardId && secondCardId && task(unflipCardsAfterDelay, {
      key: `${firstCardId}-${secondCardId}`,
      delay,
      unflipCards,
    }),
    task(tickTimer, {
      now: () => window.performance.now(),
      delay,
      updateGameTimer,
    }),
    // TODO: Task to preload sounds.
    lastItemMatched && task(playItemSound, {
      key: lastItemMatched.id,
      item: lastItemMatched,
      playUrl,
    }),
  ];
}

function* unflipCardsAfterDelay(getProps) {
  yield getProps().delay(SELECTION_DELAY);
  getProps().unflipCards();
}

function* tickTimer(getProps) {
  let tickStart = getProps().now();
  while (true) { // eslint-disable-line no-constant-condition
    yield getProps().delay(100);
    const tickEnd = getProps().now();
    const millisecondsElapsed = tickEnd - tickStart;
    tickStart = tickEnd;
    getProps().updateGameTimer(millisecondsElapsed);
  }
}

function* playItemSound(getProps) {
  const { item } = getProps();

  if (item.sound) {
    // Yield so that the sound gets cancelled if the task is cancelled.
    yield getProps.playUrl(item.sound);
  }
}
