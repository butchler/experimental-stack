import React, { PropTypes } from 'react';
import { withTasks, task, call, callMethod, delay } from 'react-task';
import injector from 'helpers/injector';
import { playUrl } from 'helpers/audio';
import { SELECTION_DELAY } from 'constants/config';
import { unflipCards, updateGameTimer, quitGame } from 'constants/actions';
import GameView from './GameView';

export default injector(({ store, dispatch }) => ({
  // For view
  timeElapsed: store.game.timer.string,
  numAttempts: store.game.numAttempts,
  cards: store.game.cards,
  onQuit: () => dispatch(quitGame()),
  // For tasks
  firstCard: store.game.firstCardSelected,
  secondCard: store.game.secondCardSelected,
  lastItemMatched: store.game.lastItemMatched,
  unflipCards: () => dispatch(unflipCards),
  updateTimer: ms => dispatch(updateTimer, ms),
}))(
  withTasks(mapPropsToTasks)(GameView)
);

// Asynchronous tasks
function mapPropsToTasks({ unflipCards, firstCard, secondCard, updateTimer, lastItemMatched }) {
  return [
    !!firstCard && !!secondCard && task(unflipCardsAfterDelay, {
      key: `${firstCard.id}-${secondCard.id}`,
      unflipCards,
    }),
    task(tickTimer, { updateTimer }),
    task(playCorrectItems, { firstCard, secondCard }),
    // TODO: Task to preload sounds.
    lastItemMatched && task(playItemSound, { key: lastItemMatched.id, item: lastItemMatched }),
  ];
}

function* unflipCardsAfterDelay(getProps) {
  yield call(delay, SELECTION_DELAY);
  getProps().unflipCards();
}

function* tickTimer(getProps) {
  const startTime = yield callMethod(window.performance, 'now');

  while (true) {
    yield call(delay, 100);
    const now = yield callMethod(window.performance, 'now');
    const millisecondsElapsed = now - startTime;
    getProps().updateTimer(millisecondsElapsed);
  }
}

function* playItemSound(getProps) {
  const { item } = getProps();

  if (item.sound) {
    yield call(playUrl, item.sound);
  }
}
