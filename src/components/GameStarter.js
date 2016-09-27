import React, { PropTypes } from 'react';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { task, call, delay } from 'react-task';
import { startGame, showResults } from 'constants/actions';
import { SHOW_RESULTS_DELAY } from 'constants/config';

// Constants
const NOT_STARTED = 'not-started';
const STARTED = 'started';
const RESULTS = 'results';

// Controller component
function GameStarter({ mode, allItemsMatched, showResults }) {
  if (mode === NOT_STARTED) {
    return <GameStarterView />;
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
};

export default inject(({ store, dispatch }) => {
  return {
    mode: store.ui.gameStarter.mode,
    allItemsMatched: store.game.allItemsMatched,
    showResults: () => dispatch(showResults()),
  };
})(observer(GameStarter));

// UI state store
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

// Asynchronous tasks
function* showResultsAfterDelay(getProps) {
  yield call(delay(SHOW_RESULTS_DELAY));
  const { showResults } = yield call(getProps);
  yield call(showResults);
}

const ShowResultsTask = task(showResultsAfterDelay);

ShowResultsTask.propTypes = {
  showResults: PropTypes.func.isRequired,
};
