import { observable, computed, action } from 'mobx';
import { setLanguage } from 'constants/actions';
import { GoalLoaderStore } from 'components/GoalLoader';

export default class UiStore {
  @observable currentLanguage;
  @observable goal = new GoalLoaderStore();

  @computed get strings() {
    return getStrings(this.currentLanguage);
  }

  @action dispatch(action) {
    if (action.type === setLanguage.type) {
      this.currentLanguage = action.payload;
    }

    this.goal.dispatch(action);
  }
}
