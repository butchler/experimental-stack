import React, { PropTypes } from 'react';
import { withTasks, task, call, callMethod, delay } from 'react-task';
import GameView from 'components/GameView';
import { SELECTION_DELAY } from 'constants/config';
import { unflipCards, updateGameTimer } from 'constants/actions';

// Asynchronous tasks
const gameTasks = withTasks(({ unflipCards, firstCard, secondCard, updateTimer }) => [
  !!firstCard && !!secondCard && task(unflipCardsAfterDelay, {
    key: `${firstCard.id}-${secondCard.id}`,
    unflipCards,
  }),
  !!gameOver && task(tickTimer, { updateTimer }),
  task(playCorrectItems, { firstCard, secondCard }),
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

function createAudio(url) {
  return new Audio(url);
}

function playAudio(audio) {
  audio.play();
}

function* playCorrectItems(getProps) {
  // Start loading audio for each item.
  const audio = {};
  const items = getProps().items;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (item.sound) {
      audio[item.sound] = yield call(createAudio, item.sound);
    }
  }

  while (true) {
    // Wait until a card is correctly matched.
    const { firstCard } = yield waitProps(
      ({ firstCard }) => getProps().getItemForCard(firstCard).matched
    );

    const item = getProps().getItemForCard(firstCard);
    if (audio[item.sound]) {
      yield call(playAudio, audio[item.sound]);
    }
  }
}

export default inject(({ store, dispatch }) => ({
  firstCard: store.game.firstCardSelected,
  secondCard: store.game.secondCardSelected,
  timeElapsed: store.game.timer.string,
  numAttempts: store.game.numAttempts,
  cards: store.game.cards,
  items: store.game.items,
  unflipCards: () => dispatch(unflipCards),
  updateTimer: ms => dispatch(updateTimer, ms),
}))(observer(gameTasks(GameView)));
