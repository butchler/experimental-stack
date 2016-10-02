import React, { PropTypes } from 'react';
import { withTasks, task, call, callMethod, delay } from 'react-task';
import GameView from 'components/GameView';
import { SELECTION_DELAY } from 'constants/config';
import { unflipCards, updateGameTimer } from 'constants/actions';

// Asynchronous tasks
const gameTasks = withTasks(({
  unflipCards, firstCard, secondCard, updateTimer, items, lastItemMatched
}) => [
  !!firstCard && !!secondCard && task(unflipCardsAfterDelay, {
    key: `${firstCard.id}-${secondCard.id}`,
    unflipCards,
  }),
  task(tickTimer, { updateTimer }),
  task(playCorrectItems, { firstCard, secondCard }),
  // TODO: Task to preload sounds.
  lastItemMatched && task(playItemSound, { key: lastItemMatched.id, item: lastItemMatched }),
]);

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

function playSound(url) {
  const audio = new Audio(url);
  audio.play();
}

function* playItemSound(getProps) {
  const { item } = getProps();

  if (item.sound) {
    yield call(playSound, item.sound);
  }
}

export default inject(({ store, dispatch }) => ({
  firstCard: store.game.firstCardSelected,
  secondCard: store.game.secondCardSelected,
  timeElapsed: store.game.timer.string,
  numAttempts: store.game.numAttempts,
  cards: store.game.cards,
  items: store.game.items,
  lastItemMatched: store.game.lastItemMatched,
  unflipCards: () => dispatch(unflipCards),
  updateTimer: ms => dispatch(updateTimer, ms),
}))(observer(gameTasks(GameView)));
