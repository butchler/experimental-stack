import { Reducer, subscriber } from 'globals/store';
import { startGame, quitGame } from 'constants/actions';
import GameLauncherView, {
  MODE_NOT_STARTED, MODE_STARTED, MODE_RESULTS,
} from './GameLauncherView';

export default connect(
  state => state[GAME_LAUNCHER]
)(GameLauncherView);

const State = Record({ mode: MODE_NOT_STARTED });

export const gameLauncherReducer = Reducer('GameLauncher', State(), [
  [startGame, state => state.set('mode', MODE_STARTED)],
  [showResults, state => state.set('mode', MODE_RESULTS)],
  [quitGame, state => state.set('mode', MODE_NOT_STARTED)],
]);

export default subscriber(gameLauncherReducer)(GameLauncherView);
