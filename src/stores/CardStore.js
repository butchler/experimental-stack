import { observable, computed } from 'mobx';
import { assert } from '../util';

// Represents a single card in the UI.
export default class CardStore {
    // A reference to the item from the goal items.
    @observable item;
    // Whether this card shows the English or Japanese word for the item (can
    // be either "cue" or "response").
    @observable side;
    // Whether or not the player has found the matching card for this card.
    @observable matchFound = false;

    constructor(item, side) {
        assert(side === 'cue' || side === 'response', "side must be 'cue' or 'response'");

        this.item = item;
        this.side = side;
    }

    // Returns a unique id for this card.
    @computed get id() {
      return this.item.item.id + '-' + this.side;
    }

    @computed get text() {
      return this.item.item[this.side].text;
    }
}
