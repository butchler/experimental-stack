import { observable, action } from 'mobx';
import { setLanguage } from 'constants/actions';
import { GoalLoaderStore } from 'components/GoalLoader';
import { GameStarterStore } from 'components/GameStarter';

export default class UiStore {
  @observable currentLanguage;
  @observable goalLoader = new GoalLoaderStore();
  @observable gameStarter = new GameStarterStore();

  @action dispatch(action) {
    if (action.type === setLanguage.type) {
      this.currentLanguage = action.payload;
    } else {
      this.goalLoader.dispatch(action);
      this.gameStarter.dispatch(action);
    }
  }
}
