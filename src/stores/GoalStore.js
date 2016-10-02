import { observable, action } from 'mobx';
import { setGoalItems } from '../actions';

export default class GoalStore {
  @observable items;

  @action dispatch({ type, payload }) {
    if (type === setGoalItems.type) {
      this.items = payload;
    }
  }
}
