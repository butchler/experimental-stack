import React, { PropTypes } from 'react';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { withTasks, task, call, delay } from 'react-task';
import { startGame, showResults } from 'constants/actions';
import { SHOW_RESULTS_DELAY } from 'constants/config';
import GameStarterView from 'components/GameStarterView';
import Game from 'components/Game';
import GameResults from 'components/GameResults';

// Constants
const NOT_STARTED = 'not-started';
const STARTED = 'started';
const RESULTS = 'results';

// Controller component
function GameStarter({ mode, allItemsMatched, showResults }) {
  if (mode === NOT_STARTED) {
    return <GameStarterView />;
  } else if (mode === STARTED) {
    return <Game />;
  } else if (mode === RESULTS) {
    return <GameResults {...gameStarterProps} />;
  }
}

GameStarter.propTypes = {
  mode: PropTypes.string.isRequired,
  allItemsMatched: PropTypes.bool.isRequired,
  showResults: PropTypes.func.isRequired,
};

// Asynchronous tasks
const gameStarterTasks = withTasks(({ allItemsMatched, showResults }) => [
  allItemsMatched && task(showResultsAfterDelay, { showResults }),
]);

function* showResultsAfterDelay(getProps) {
  yield call(delay, SHOW_RESULTS_DELAY);
  getProps().showResults();
}

// State injector
export default inject(({ store, dispatch }) => {
  return {
    mode: store.ui.gameStarter.mode,
    allItemsMatched: store.game.allItemsMatched,
    showResults: () => dispatch(showResults()),
  };
})(observer(gameStarterTasks(GameStarter)));

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
