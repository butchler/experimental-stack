import React, { PropTypes } from 'react';
import { observable, action } from 'mobx';
import { withTasks, task, call, delay } from 'react-task';
import injector from 'helpers/injector';
import { startGame, showResults, quitGame } from 'constants/actions';
import { SHOW_RESULTS_DELAY } from 'constants/config';
import Game from 'components/game/Game';
import GameResults from 'components/game-launcher/GameResults';
import GameLauncherView from './GameLauncherView';

// Constants
const NOT_STARTED = 'not-started';
const STARTED = 'started';
const RESULTS = 'results';

// UI state store
export class GameLauncherStore {
  @observable mode = NOT_STARTED;

  @action dispatch({ type }) {
    if (type === startGame) {
      this.mode = STARTED;
    } else if (type === showResults) {
      this.mode = RESULTS;
    } else if (type === quitGame) {
      this.mode = NOT_STARTED;
    }
  }
}

// State injector
export default injector(({ store, dispatch }) => ({
  mode: store.ui.gameLauncher.mode,
  allItemsMatched: store.game.allItemsMatched,
  showGameResults: () => dispatch(showResults()),
}))(withTasks(mapPropsToTasks)(GameLauncher));

// Asynchronous tasks
function mapPropsToTasks({ allItemsMatched, showGameResults }) {
  return [
    allItemsMatched && task(showResultsAfterDelay, { showGameResults }),
  ];
}

function* showResultsAfterDelay(getProps) {
  yield call(delay, SHOW_RESULTS_DELAY);
  getProps().showGameResults();
}

// Controller component
function GameLauncher({ mode }) {
  if (mode === STARTED) {
    return <Game />;
  } else if (mode === RESULTS) {
    return <GameResults />;
  } else {
    return <GameLauncherView />;
  }
}

GameLauncher.propTypes = {
  mode: PropTypes.string.isRequired,
};
