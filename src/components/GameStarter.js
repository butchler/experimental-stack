import React, { PropTypes } from 'react';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { task, call, delay } from 'react-task';
import { startGame, showResults } from 'constants/actions';
import { NUM_ITEMS_EASY, NUM_ITEMS_MEDIUM, NUM_ITEMS_HARD, SHOW_RESULTS_DELAY } from 'constants/config';

const NOT_STARTED = 'not-started';
const STARTED = 'started';
const RESULTS = 'results';

function GameStarter({ mode, allItemsMatched, showResults, ...gameStarterProps }) {
  if (mode === NOT_STARTED) {
    return <GameStarterView {...gameStarterProps} />;
  } else if (mode === STARTED) {
    return (
      <div>
        <Game />

        {allItemsMatched && <ShowResultsTask showResults={showResults} />}
      </div>
    );
  } else if (mode === RESULTS) {
    return <GameResults {...gameStarterProps} />;
  }
}

GameStarter.propTypes = {
  mode: PropTypes.string.isRequired,
  allItemsMatched: PropTypes.bool.isRequired,
  showResults: PropTypes.func.isRequired,
  startEasy: PropTypes.func.isRequired,
  startMedium: PropTypes.func.isRequired,
  startHard: PropTypes.func.isRequired,
};

export default inject(({ store, dispatch }) => {
  return {
    mode: store.ui.gameStarter.mode,
    allItemsMatched: store.game.allItemsMatched,
    showResults: () => dispatch(showResults()),
    startEasy: () => dispatch(startGame(getRandomCards(NUM_ITEMS_EASY))),
    startMedium: () => dispatch(startGame(getRandomCards(NUM_ITEMS_MEDIUM))),
    startHard: () => dispatch(startGame(getRandomCards(NUM_ITEMS_HARD))),
  };
})(observer(GameStarter));

export class GameStarterStore {
  @observable mode = NOT_STARTED;

  @action dispatch(action) {
    if (action.type === startGame) {
      this.mode = STARTED;
    } else if (action.type === showResults) {
      this.mode = RESULTS;
    }
  }
}

function* showResultsAfterDelay(getProps) {
  yield call(delay(SHOW_RESULTS_DELAY));
  const { showResults } = yield call(getProps);
  yield call(showResults);
}

const ShowResultsTask = task(showResultsAfterDelay);

ShowResultsTask.propTypes = {
  showResults: PropTypes.func.isRequired,
};
