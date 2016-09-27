import { observable, action, asReference } from 'mobx';
import { assert } from '../util';
import { setGoalItems } from '../actions';

export default class GoalStore {
  @observable items;

  @action dispatch({ type, error, payload }) {
    if (type === setGoalItems.type) {
      this.items = payload;
    }
  }

  // TODO: Convert to action in game store.
  getRandomItems(numItems) {
    assert(this.isLoaded, "Goal must be loaded before calling getRandomItems()");
    assert(Number.isInteger(numItems) && numItems > 0, 'numItems must be a positive integer');

    const randomItems = [];

    // Randomly swap the order of items in this.goalItems, appending to
    // randomItems as we go. This way, there won't be any duplication of
    // items unless numItems > this.goalItems.length.
    for (let i = 0; i < numItems; i++) {
      // In case numItems > this.goalItems.length.
      const swapIndex = i % this.goalItems.length;

      // Randomly swap the current item with another item after it in the list
      // (possibly swapping it with itself/keeping it in the same place).
      const randomIndex = swapIndex + Math.floor(Math.random() * (this.goalItems.length - swapIndex));
      [this.goalItems[i], this.goalItems[randomIndex]] = [this.goalItems[randomIndex], this.goalItems[i]];

      // Add the current item to the result list.
      randomItems.push(this.goalItems[swapIndex]);
    }

    return randomItems;
  }
}
