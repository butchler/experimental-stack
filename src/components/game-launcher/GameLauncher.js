import { connect } from 'react-redux';
import { withTasks, task, delay } from 'react-task';
import { startGame, showResults, quitGame } from 'constants/actions';
import { SHOW_RESULTS_DELAY } from 'constants/config';
import { GAME_LAUNCHER } from 'reducers/app';
import GameLauncherView, {
  MODE_NOT_STARTED, MODE_STARTED, MODE_RESULTS,
} from './GameLauncherView';

const INITIAL_STATE = {
  mode: MODE_NOT_STARTED,
  items: null,
  allItemsMatched: false,
};

export function reduceGameLauncher(viewState = {}, items, action) {
  const mode = reduceMode(viewState.mode, action);

  if (viewState.items === items) {
    return { ...viewState, mode };
  } else {
    return {
      mode,
      items,
      allItemsMatched: !!items && items.every(item => item.matched),
    };
  }
}

function reduceMode(mode, { type }) {
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
