import { observer, inject } from 'mobx-react';
import GameResultsView from 'components/GameResultsView';

export default inject(({ store }) => {
  return {
    items: store.game.items,
    timeElapsed: store.game.timer.timeElapsedString,
    numAttempts: store.game.numAttempts,
  };
})(observer(GameResultsView));
