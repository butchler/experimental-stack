import { observable, computed } from 'mobx';

// Represents a single card in the UI.
export default class CardStore {
  // A reference to the item from the goal items.
  @observable item;
  // Whether this card shows the English or Japanese word for the item (can
  // be either "cue" or "response").
  @observable side;

  constructor(item, side) {
    if (!(side === 'cue' || side === 'response')) {
      throw new TypeError("side must be 'cue' or 'response'");
    }

    this.item = item;
    this.side = side;
  }

  @computed get text() {
    return this.item[this.side];
  }
}
