import { observable, computed } from 'mobx';

import { assert } from '../util';

// Represents a single card in the UI.
export default class CardStore {
    // Whether or not the player has found the matching card for this card.
    @observable matchFound = false;

    // A reference to the item from the goal items.
    item;
    // Whether this card shows the English or Japanese word for the item (can
    // be either "cue" or "response").
    side;
    // React component key.
    key;
    // The text contents of the card.
    text;
    // A reference to the GameStore that this card belongs to.
    game;

    constructor(goalItem, side, game) {
        assert(side === 'cue' || side === 'response', "side must be 'cue' or 'response'");

        this.item = goalItem;
        this.side = side;
        this.game = game;

        this.key = this.item.item.id + '-' + this.side;
        this.text = this.item.item[this.side].text;
    }

    @computed get isFaceUp() {
        return this.isSelected || this.matchFound;
    }

    @computed get isSelected() {
        return this.game.firstCardSelected === this || this.game.secondCardSelected === this;
    }

    @computed get isCorrect() {
        return this.isSelected && this.game.isMatchCorrect;
    }

    @computed get isWrong() {
        return this.isSelected && this.game.isMatchWrong;
    }
}
