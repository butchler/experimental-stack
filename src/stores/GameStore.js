import { observable, action, computed, autorun, transaction, when } from 'mobx';

import { SELECTION_DELAY, SHOW_RESULTS_DELAY } from '../constants';
import { flipCard, startGame, quitGame, updateGameTimer } from '../actions';
import { assert } from '../util';

import CardStore from './CardStore';

export const MODE_DONE = 'done';
export const MODE_STARTED = 'started';

// Represents a game with a set of cards.
export default class GameStore {
  @observable items = [];
  @observable cards = [];
  @observable mode = MODE_DONE;
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

    if (this.mode === MODE_DONE) {
      if (type === startGame.type) {
        this.mode = MODE_STARTED;
        this.items = payload.items.map(({ cue, response }) => new ItemStore(cue, response));
        this.cards = payload.cards.map(({ itemIndex, side }) => new CardStore(this.items[itemIndex], side));
        this.timer = new TimerStore();
        this.firstCardSelected = this.secondCardSelected = undefined;
        this.numAttempts = 0;
      }
    } else if (this.mode === MODE_STARTED) {
      if (type === quitGame.type) {
        // Reset all values when the user chooses to quit.
        this.items = [];
        this.cards = [];
        this.mode = MODE_DONE;
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
        }
      } else if (type === updateGameTimer.type) {
        this.timer.dispatch(action);
      }
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

    // Formats the game.millisecondsElapsed as a "minutes:seconds" string.
    @computed get timeElapsedString() {
        const secondsElapsed = Math.floor(this.millisecondsElapsed / 1000);
        const minutes = Math.floor(secondsElapsed / 60);
        const seconds = secondsElapsed % 60;

        return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
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

    initTimer() {
        // Updates number of seconds since the game has started.
        const timeStarted = window.performance.now();
        const updateElapsedTime = () => {
            if (!this.isDone) {
                this.millisecondsElapsed = window.performance.now() - timeStarted;
                setTimeout(updateElapsedTime, 10);
            }
        };
        setTimeout(updateElapsedTime, 10);
    }

    initActionHandlers() {
        // Handle flipCard action.
        const flipCardHandler = dispatcher.register((action) => {
            if (action.type === flipCard.type) {
                this.selectCard(action.card)
            }
        });

        // Unregister the action listener for the flipCard event when the game
        // is quit or a new game is started.
        const onGameEnd = dispatcher.register((action) => {
            switch (action.type) {
                case startGame.type:
                case quitGame.type:
                    dispatcher.unregister(flipCardHandler);
                    dispatcher.unregister(onGameEnd);
            }
        });
    }

    selectCard(card) {
        if (this.isDone || card.isFaceUp) { return; }

        transaction(() => {
            // If the player has already selected another pair of cards, unselect
            // them before selecting a new pair of cards.
            if (this.secondCardSelected !== null) {
                this.firstCardSelected = this.secondCardSelected = null;

                // Make sure that the unselect timeout doesn't unselect the cards
                // again if the player starts selecting other cards before the timeout.
                if (this._unselectTimeout !== undefined) {
                    clearTimeout(this._unselectTimeout);

                    this._unselectTimeout = undefined;
                }
            }

            if (this.firstCardSelected === null) {
                // Select the first card if no card has been selected.
                this.firstCardSelected = card;
            } else {
                // Select the second card.
                this.secondCardSelected = card;

                // Check if cards match after the player has selected two cards.
                if (this.firstCardSelected.item === this.secondCardSelected.item) {
                    this.firstCardSelected.matchFound = this.secondCardSelected.matchFound = true;
                }

                this.numAttempts += 1;

                // TODO: Make into a Task
                // Unselect cards after a delay.
                this._unselectTimeout = setTimeout(() => {
                    this.firstCardSelected = this.secondCardSelected = null;
                }, SELECTION_DELAY);
            }
        });
    }

    playWordIfCorrect() {
        // Start loading audio for each item.
        const preloadedAudio = {};
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];

            if (item.sound) {
                preloadedAudio[item.item.id] = new Audio(item.sound);
            }
        }

        // Automatically play the sound for the item when the user matches two
        // cards correctly.
        const disposeAutorun = autorun(() => {
            if (this.isMatchCorrect) {
                const itemId = this.firstCardSelected.item.item.id;

                if (preloadedAudio[itemId] !== undefined) {
                    preloadedAudio[itemId].play();
                }
            }
        });

        // Dispose of autorun when game ends or a new game is started.
        const onGameEnd = dispatcher.register((action) => {
            switch (action.type) {
                case startGame.type:
                case quitGame.type:
                    disposeAutorun();
                    dispatcher.unregister(onGameEnd);
            }
        });
    }

    showResultsAfterWin() {
        // Show the results screen a second or so after winning the game.
        when(() => this.isDone, () => {
            setTimeout(() => this.showResults = true, SHOW_RESULTS_DELAY);
        });
    }
}
