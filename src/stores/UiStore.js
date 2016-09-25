import { observable, computed } from 'mobx';
import { setLanguage } from '../actions';

export default class UiStore {
  @observable currentLanguage = null;

  @computed get strings() {
    return getStrings(this.currentLanguage);
  }

  @action
  dispatch(action) {
    if (action.type === setLanguage.type) {
      this.currentLanguage = action.payload;
    }
  }
}
