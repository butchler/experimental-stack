import { observable, action, computed } from 'mobx';
import { flipCard, unflipCards, startGame, updateGameTimer } from 'constants/actions';
import CardStore from 'stores/CardStore';
import ItemStore from 'stores/ItemStore';
import TimerStore from 'stores/TimerStore';

// Represents a game with a set of cards.
export default class GameStore {
  @observable items = [];
  @observable cards = [];
  @observable firstCardSelected;
  @observable secondCardSelected;
  @observable numAttempts = 0;
  @observable timer;
  @observable lastItemMatched;

  isCardSelected(card) {
    return card === this.firstCardSelected || card === this.secondCardSelected;
  }

  @computed get allItemsMatched() {
    return this.items.every(item => item.matched);
  }

  @action dispatch(actionObject) {
    const { type, payload } = actionObject;

    if (type === startGame.type) {
      this.items = payload.items.map(({ cue, response }) =>
        new ItemStore(cue, response));
      this.cards = payload.cards.map(({ itemIndex, side }, index) =>
        new CardStore(index, this.items[itemIndex], side));
      this.firstCardSelected = null;
      this.secondCardSelected = null;
      this.numAttempts = 0;
      this.timer = new TimerStore();
      this.lastItemMatched = null;
    } else if (type === flipCard.type) {
      const card = this.cards[payload];

      // Don't do anything if the card is already selected.
      if (!this.isCardSelected(card)) {
        if (!this.firstCardSelected) {
          // If no cards are selected.
          this.firstCardSelected = card;
        } else if (!this.secondCardSelected) {
          // If one card is selected.
          this.secondCardSelected = card;

          // Check if cards match after the player has selected two cards.
          if (this.firstCardSelected.item === this.secondCardSelected.item) {
            this.firstCardSelected.item.matched = true;
            this.lastItemMatched = this.firstCardSelected.item;
          }

          this.numAttempts += 1;
        } else {
          // If two cards are selected.
          this.firstCardSelected = card;
          this.secondCardSelected = null;
        }
      }
    } else if (type === unflipCards.type) {
      this.firstCardSelected = this.secondCardSelected = null;
    } else if (type === updateGameTimer.type) {
      if (!this.allItemsMatched) {
        this.timer.dispatch(actionObject);
      }
    }
  }
}
