import { observable, action, computed } from 'mobx';
import { flipCard, unflipCards, startGame, quitGame, updateGameTimer } from '../actions';
import CardStore from './CardStore';

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

  @action dispatch(action) {
    const { type, payload } = action;

    if (type === startGame.type) {
      this.items = payload.items.map(({ cue, response }) => new ItemStore(cue, response));
      this.cards = payload.cards.map(({ itemIndex, side }) => new CardStore(this.items[itemIndex], side));
      this.timer = new TimerStore();
      this.firstCardSelected = this.secondCardSelected = undefined;
      this.numAttempts = 0;
    } else if (type === quitGame.type) {
      // Reset all values when the user chooses to quit.
      this.items = [];
      this.cards = [];
      this.firstCardSelected = this.secondCardSelected = undefined;
      this.numAttempts = 0;
      this.timer = undefined;
      this.lastItemMatched = undefined;
    } else if (type === flipCard.type) {
      const card = this.cards[payload];

      // Don't do anything if the card is already selected.
      if (!this.isSelected(card)) {
        if (this.firstCardSelected === undefined) {
          // If no cards are selected.
          this.firstCardSelected = card;
        } else if (this.secondCardSelected === undefined) {
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
          this.secondCardSelected = undefined;
        }
      } else if (type === unflipCards.type) {
        this.firstCardSelected = this.secondCardSelected = undefined;
      }
    } else if (type === updateGameTimer.type) {
      this.timer.dispatch(action);
    }
  }
}
