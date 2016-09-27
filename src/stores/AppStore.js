import { observable } from 'mobx';
import UiStore from './UiStore';
import GoalStore from './GoalStore';
import GameStore from './GameStore';

// Top level store for the app.
export default class AppStore {
  @observable ui = new UiStore();
  @observable game = new GameStore();
  @observable goal = new GoalStore();

  @action dispatch(action) {
    this.ui.dispatch(action);
    this.game.dispatch(action);
    this.goal.dispatch(action);
  }
}
