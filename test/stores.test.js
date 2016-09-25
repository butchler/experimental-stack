import { when } from 'mobx';

import { getStrings } from '../src/translations';

import GameStore from '../src/stores/GameStore';
import GoalStore from '../src/stores/GoalStore';

import { TEST_ITEMS } from './data';

describe('GameStore', () => {
    let game, card1, card2, card3;

    beforeEach(() => {
        game = new GameStore(TEST_ITEMS);
        card1 = game.cards[0], card2 = game.cards[1], card3 = game.cards[3];
    });

    it("should have twice as many cards as items", () => {
        expect(game.cards.length).toBe(TEST_ITEMS.length * 2);
    });

    it("should increase the millisecondsElapsed", (done) => {
        setTimeout(() => {
            expect(game.millisecondsElapsed).toBeGreaterThan(0);
            done();
        }, 100);
    });

    describe('selectCard', () => {
        it("should flip the card", () => {
            game.selectCard(card1);

            expect(card1.isFaceUp).toBe(true);
        });

        it("should flip the same card only once", () => {
            game.selectCard(card1);
            game.selectCard(card1);

            expect(card1.isFaceUp).toBe(true);
        });

        it("should not increment the number of attempts prematurely", () => {
            game.selectCard(card1);
            game.selectCard(card1);

            expect(game.numAttempts).toBe(0);
        });

        it("should not select the same card twice", () => {
            game.selectCard(card1);
            game.selectCard(card1);

            expect(game.firstCardSelected).toBe(card1);
            expect(game.secondCardSelected).toBe(null);
        });

        it("should select the second card", () => {
            game.selectCard(card1);
            game.selectCard(card2);

            expect(game.firstCardSelected).toBe(card1);
            expect(game.secondCardSelected).toBe(card2);
        });

        it("should increment the number of attempts", () => {
            game.selectCard(card1);
            game.selectCard(card2);

            expect(game.numAttempts).toBe(1);
        });

        it("should unselect the previously selected cards", () => {
            game.selectCard(card1);
            game.selectCard(card2);
            game.selectCard(card3);

            expect(game.firstCardSelected).toBe(card3);
            expect(game.secondCardSelected).toBe(null);
        });
    });

    describe('isDone', () => {
        it("should not be done at first", () => {
            expect(game.isDone).toBe(false);
        });

        it("should be done after matching all cards", () => {
            // Make a game with only one item and flip its only two cards.
            game = new GameStore(TEST_ITEMS.slice(0, 1));

            expect(game.cards.length).toBe(2);

            game.selectCard(game.cards[0]);
            game.selectCard(game.cards[1]);

            expect(game.isDone).toBe(true);
        });
    });

    describe('timeElapsedString', () => {
        it("should be 0:00 when the game first starts", () => {
            expect(game.timeElapsedString).toEqual("0:00");
        });

        it("should show seconds", () => {
            game.millisecondsElapsed = 1000;
            expect(game.timeElapsedString).toEqual("0:01");

            game.millisecondsElapsed = 1111;
            expect(game.timeElapsedString).toEqual("0:01");

            game.millisecondsElapsed = 1000 * 59;
            expect(game.timeElapsedString).toEqual("0:59");
        });

        it("should show minutes", () => {
            game.millisecondsElapsed = 1000 * 60;
            expect(game.timeElapsedString).toEqual("1:00");

            game.millisecondsElapsed = 1000 * 60 + 100;
            expect(game.timeElapsedString).toEqual("1:00");

            game.millisecondsElapsed = 1000 * 60 + 1000 * 30;
            expect(game.timeElapsedString).toEqual("1:30");

            game.millisecondsElapsed = 1000 * 60 * 100;
            expect(game.timeElapsedString).toEqual("100:00");
        });
    });

    describe('CardStore', () => {
        it("should be face up when selected", () => {
            game.selectCard(card1);

            expect(card1.isFaceUp).toBe(true);
        });

        it("should be face up when match found", () => {
            card1.matchFound = true;

            expect(card1.isFaceUp).toBe(true);
        });
    });
});

describe('translations', () => {
    describe('getStrings', () => {
        it("should return the same thing for both en and en-US", () => {
            const en = getStrings('en');
            const en_US = getStrings('en-US');

            for (const property in en) {
                if (en.hasOwnProperty(property) && en_US.hasOwnProperty(property)) {
                    expect(en[property]).toEqual(en_US[property]);
                }
            }
        });

        it("should return English for unknown languages", () => {
            const en = getStrings('en');
            const bogusLanguage = getStrings('Not a language');

            for (const property in en) {
                if (en.hasOwnProperty(property) && bogusLanguage.hasOwnProperty(property)) {
                    expect(en[property]).toEqual(bogusLanguage[property]);
                }
            }
        });
    });
});

describe('GoalStore', () => {
    describe('getRandomItems', () => {
        beforeEach(() => {
        });

        it("should fail if goal isn't loaded", () => {
            const goalStore = new GoalStore('/api/goal.js');

            expect(() => goalStore.getRandomItems(10)).toThrow();
        });

        it("should fail if numItems is not a positive integer", () => {
            const goalStore = new GoalStore('bogus/url.js');
            goalStore.goalItems = TEST_ITEMS;
            goalStore.isLoaded = true;

            expect(() => goalStore.getRandomItems(0)).toThrow();
            expect(() => goalStore.getRandomItems(-1)).toThrow();
            expect(() => goalStore.getRandomItems('string')).toThrow();
        });

        it("should return the given number of items", () => {
            const goalStore = new GoalStore('bogus/url.js');
            goalStore.goalItems = TEST_ITEMS;
            goalStore.isLoaded = true;

            expect(goalStore.getRandomItems(1).length).toBe(1);
            expect(goalStore.getRandomItems(10).length).toBe(10);
            expect(goalStore.getRandomItems(100).length).toBe(100);
        });
    });
});
