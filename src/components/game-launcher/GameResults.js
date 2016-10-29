import { connect } from 'react-redux';
import GameResultsView from './GameResultsView';
import { GAME_RESULTS } from 'reducers/app';

export function reduceGameResults(items, timeElapsed, numAttempts) {
  return { items, timeElapsed, numAttempts };
}

export default connect(state => state[GAME_RESULTS])(GameResultsView);
