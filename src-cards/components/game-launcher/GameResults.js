import { connect } from 'react-redux';
import { GAME_RESULTS } from 'reducers/app';
import GameResultsView from './GameResultsView';

export function reduceGameResults(items, timeElapsed, numAttempts) {
  return { items, timeElapsed, numAttempts };
}

export default connect(state => state[GAME_RESULTS])(GameResultsView);
