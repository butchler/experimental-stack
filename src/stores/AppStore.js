import { observable, action } from 'mobx';
import UiStore from 'stores/UiStore';
import GoalStore from 'stores/GoalStore';
import GameStore from 'stores/GameStore';

// Top level store for the app.
export default class AppStore {
  @observable ui = new UiStore();
  @observable game = new GameStore();
  @observable goal = new GoalStore();

  @action dispatch(actionObject) {
    this.ui.dispatch(actionObject);
    this.game.dispatch(actionObject);
    this.goal.dispatch(actionObject);
  }
}
