import { observable, action } from 'mobx';
import { setLanguage } from 'constants/actions';
import { GoalLoaderStore } from 'components/GoalLoader';
import { GameLauncherStore } from 'components/game-launcher/GameLauncher';

export default class UiStore {
  @observable currentLanguage;
  @observable goalLoader = new GoalLoaderStore();
  @observable gameLauncher = new GameLauncherStore();

  @action dispatch(action) {
    if (action.type === setLanguage.type) {
      this.currentLanguage = action.payload;
    } else {
      this.goalLoader.dispatch(action);
      this.gameLauncher.dispatch(action);
    }
  }
}
