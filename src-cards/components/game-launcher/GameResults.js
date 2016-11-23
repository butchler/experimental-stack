import { Record } from 'immutable';
import { Reducer, subscriber } from 'globals/store';
import gameStateReducer from 'reducers/gameState';
import gameTimerReducer from 'reducers/gameTimer';
import GameResultsView from './GameResultsView';

export const gameResultsReducer = Reducer('GameResults', State(), [
  [gameStateReducer, (state, gameState) => state.merge({
    items: gameState.items,
    numAttempts: gameState.numAttempts,
  })],
  [gameTimerReducer, (state, gameTimer) => state.set('timeElapsed', gameTimer.timeElapsedString)],
]);

export default subscriber(gameResultsReducer)(GameResultsView);
