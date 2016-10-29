import { connect } from 'react-redux';
import { withTasks, task, delay } from 'react-task';
import { startGame, showResults, quitGame } from 'constants/actions';
import { SHOW_RESULTS_DELAY } from 'constants/config';
import { GAME_LAUNCHER } from 'reducers/app';
import GameLauncherView, {
  MODE_NOT_STARTED, MODE_STARTED, MODE_RESULTS,
} from './GameLauncherView';

export function reduceGameLauncher(viewState = {}, allItemsMatched, action) {
  return {
    mode: reduceMode(viewState.mode, action),
    allItemsMatched,
  };
}

function reduceMode(mode = MODE_NOT_STARTED, { type }) {
  switch (type) {
    case startGame.type:
      return MODE_STARTED;
    case showResults.type:
      return MODE_RESULTS;
    case quitGame.type:
      return MODE_NOT_STARTED;
    default:
      return mode;
  }
}

export default connect(
  state => state[GAME_LAUNCHER],
  { showResults }
)(withTasks(mapPropsToTasks)(GameLauncherView));

// Asynchronous tasks
function mapPropsToTasks({ mode, allItemsMatched, showResults }) {
  return [
    mode === MODE_STARTED && allItemsMatched && task(showResultsAfterDelay, { showResults, delay }),
  ];
}

function* showResultsAfterDelay(getProps) {
  yield getProps().delay(SHOW_RESULTS_DELAY);
  getProps().showResults();
}
