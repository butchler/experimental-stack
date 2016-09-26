import { observable, action, asReference } from 'mobx';
import { assert } from '../util';
import { setGoalItems } from '../actions';

// Represents the database of items from the goal API.
export default class GoalStore {
  // Save the items as a reference so that it the entire tree doesn't get converted to observable
  // objects.
  @observable items = asReference(null);
  @observable errorMessage = null;

  @action
  dispatch({ type, error, payload }) {
    if (type === setGoalItems.type) {
      if (error) {
        this.items = null;
        this.errorMessage = payload;
      } else {
        this.items = payload;
      }
    }
  }

  // TODO: Convert to Task
  constructor(goalUrl) {
    assert(typeof goalUrl === 'string', "goalUrl must be a string");

    // Load the JSON at the given URL and store its items in this.goalItems.
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200 && request.response) {
          // TODO: Validate API data.
          const goal = JSON.parse(request.response);
          this.goalItems = goal['goal_items'];
          this.isLoaded = true;
        } else {
          this.errorMessage = "There was a problem loading the goal data.";
        }
      }
    };
    request.open('GET', goalUrl);
    request.send();
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
