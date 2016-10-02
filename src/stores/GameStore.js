import { observable, action, computed, autorun, transaction, when } from 'mobx';

import { SELECTION_DELAY, SHOW_RESULTS_DELAY } from '../constants';
import { flipCard, unflipCards, startGame, quitGame, updateGameTimer } from '../actions';
import { assert } from '../util';

import CardStore from './CardStore';

// Represents a game with a set of cards.
export default class GameStore {
  @observable items = [];
  @observable cards = [];
  @observable firstCardSelected;
  @observable secondCardSelected;
  @observable numAttempts = 0;
  @observable timer;

  isCardSelected(card) {
    return card === this.firstCardSelected || card === this.secondCardSelected;
  }

  @computed get allItemsMatched() {
    return this.items.every(item => item.matched);
  }

  // TODO: Move these to controller components.
  //isCardFaceUp(card) {
    //return card.matchFound === true || this.isCardSelected(card);
  //}

  //isCardCorrect(card) {
    //return this.isCardSelected(card) && this.secondCardSelected !== null && this.secondCardSelected.matchFound;
  //}

  //isCardWrong(card) {
    //return this.isCardSelected(card) && this.secondCardSelected !== null && !this.secondCardSelected.matchFound;
  //}

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

    items;
    cards;

    @observable firstCardSelected = null;
    @observable secondCardSelected = null;

    @observable millisecondsElapsed = 0;
    @observable numAttempts = 0;

    @observable showResults = false;

    @computed get isDone() {
        return this.cards.every((card) => card.matchFound);
    }

    @computed get isMatchCorrect() {
        return this.secondCardSelected !== null && this.secondCardSelected.matchFound;
    }

    @computed get isMatchWrong() {
        return this.secondCardSelected !== null && !this.secondCardSelected.matchFound;
    }

    constructor(items) {
        this.items = items;

        this.initCards();

        this.initTimer();

        this.initActionHandlers();

        this.playWordIfCorrect();

        this.showResultsAfterWin();
    }

    initCards() {
        this.cards = [];

        // Create a cue card and a response card for each item.
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            this.cards.push(new CardStore(item, "cue", this));
            this.cards.push(new CardStore(item, "response", this));
        }

        // Shuffle the cards so that the cue card isn't right next to the response card.
        for (let i = 0; i < this.cards.length; i++) {
            const randomIndex = i + Math.floor(Math.random() * (this.cards.length - i));
            [this.cards[i], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[i]];
        }
    }
}
