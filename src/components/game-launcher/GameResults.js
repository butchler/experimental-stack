import injector from 'helpers/injector';
import GameResultsView from './GameResultsView';

export default injector(({ store }) => ({
  items: store.game.items,
  timeElapsed: store.game.timer.timeElapsedString,
  numAttempts: store.game.numAttempts,
}))(GameResultsView);
