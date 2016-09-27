import { observable, computed, action } from 'mobx';
import { setLanguage } from 'constants/actions';
import { GoalLoaderStore } from 'components/GoalLoader';
import { GameStarterStore } from 'components/GameStarter';

export default class UiStore {
  @observable currentLanguage;
  @observable goalLoader = new GoalLoaderStore();
  @observable gameStarter = new GameStarterStore();

  @computed get strings() {
    return getStrings(this.currentLanguage);
  }

  @action dispatch(action) {
    if (action.type === setLanguage.type) {
      this.currentLanguage = action.payload;
    }

    this.goalLoader.dispatch(action);
    this.gameStarter.dispatch(action);
  }
}
