import { observable } from 'mobx';

import { GOAL_URL } from '../constants';
import { startGame, quitGame } from '../actions';
import { getStrings, DEFAULT_LANGUAGE } from '../translations';

import UiStore from './UiStore';
import GoalStore from './GoalStore';
import GameStore from './GameStore';

// Top level store for the app.
export default class AppStore {
  @observable game = null;
  goal;

  constructor() {
    // TODO: Dispatch these as actions outside of store before app starts.
    // Start loading the goal when the app starts.
    this.goal = new GoalStore(GOAL_URL);

    // Load the strings for the user's language.
    dispatcher.dispatch(setLanguage.create(window.navigator.language || window.navigator.userLanguage || DEFAULT_LANGUAGE.code));
  }




  @observable ui = new UiStore();
  @observable game = new GameStore();
  @observable goal = new GoalStore();

  @action
  dispatch(action) {
    this.ui.dispatch(action);
    this.game.dispatch(action);
    this.goal.dispatch(action);

    const { type } = action;

    if (type === startGame.type) {
      const randomItems = this.goal.getRandomItems(action.numItems);

      this.game = new GameStore(randomItems);
    } else if (type === quitGame.type) {
      this.game = null;
    }
  }
}
