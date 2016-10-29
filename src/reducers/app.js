import {
  setLanguage, setGoalItems, startGame, flipCard, unflipCards, updateGameTimer,
} from 'constants/actions';
import { reduceGoalLoader } from 'components/GoalLoader';
import { reduceTranslator } from 'components/T';
import { reduceLanguageSwitcher } from 'components/LanguageSwitcher';
import { reduceGameLauncher } from 'components/game-launcher/GameLauncher';
import { reduceGameResults } from 'components/game-launcher/GameResults';
import { reduceStartGameButtons } from 'components/game-launcher/StartGameButtons';
import { reduceGame } from 'components/game/Game';
import { reduceCards } from 'components/game/Card';

export const CURRENT_LANGUAGE = 'currentLanguage';
export const GOAL_ITEMS = 'goalItems';
export const GAME_STATE = 'gameState';
export const GAME_TIMER = 'gameTimer';
// Views
export const TRANSLATOR = 'translator';
export const LANGUAGE_SWITCHER = 'languageSwitcher';
export const GOAL_LOADER = 'goalLoader';
export const GAME_LAUNCHER = 'gameLauncher';
export const GAME_RESULTS = 'gameResults';
export const START_GAME_BUTTONS = 'startGameButtons';
export const GAME = 'game';
export const CARDS = 'cards';

export default function reduceApp(state = {}, action) {
  const currentLanguage = reduceCurrentLanguage(state[CURRENT_LANGUAGE], action);
  const gameState = reduceGameState(state[GAME_STATE], action);
  const gameTimer = reduceGameTimer(state[GAME_TIMER], action);
  const goalItems = reduceGoalItems(state[GOAL_ITEMS], action);

  return {
    [CURRENT_LANGUAGE]: currentLanguage,
    [GAME_STATE]: gameState,
    [GAME_TIMER]: gameTimer,
    [GOAL_ITEMS]: goalItems,
    // Views
    [TRANSLATOR]: reduceTranslator(currentLanguage),
    [LANGUAGE_SWITCHER]: reduceLanguageSwitcher(currentLanguage),
    [GOAL_LOADER]: reduceGoalLoader(state[GOAL_LOADER], action),
    [GAME_LAUNCHER]: reduceGameLauncher(state[GAME_LAUNCHER], gameState.items, action),
    [GAME_RESULTS]: reduceGameResults(
      gameState.items,
      gameTimer.timeElapsedString,
      gameState.numAttempts
    ),
    [START_GAME_BUTTONS]: reduceStartGameButtons(goalItems),
    [GAME]: reduceGame(gameState, gameTimer),
    [CARDS]: reduceCards(state[CARDS], gameState, action),
  };
}

function reduceGoalItems(state = [], { type, payload }) {
  if (type === setGoalItems.type) {
    return payload;
  }

  return state;
}

function reduceCurrentLanguage(currentLanguage = 'en', { type, payload }) {
  if (type === setLanguage.type) {
    return payload;
  }

  return currentLanguage;
}

const INITIAL_GAME_STATE = {
  items: [],
  cards: [],
  firstCardId: null,
  secondCardId: null,
  numAttempts: 0,
  lastItemMatched: null,
};

function reduceGameState(state = INITIAL_GAME_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case startGame.type:
      return {
        ...INITIAL_GAME_STATE,
        items: payload.items.map(({ cue, response }) => ({ cue, response, matched: false })),
        cards: payload.cards.map(({ itemId, side }, index) => ({ id: index, itemId, side })),
      };
    case flipCard.type:
      // Don't do anything if the card is already selected or matched.
      if (
        payload === state.firstCardId ||
        payload === state.secondCardId ||
        state.items[state.cards[payload].itemId].matched
      ) {
        return state;
      }

      if (state.firstCardId === null) {
        // If no cards are selected.
        return { ...state, firstCardId: payload };
      } else if (state.secondCardId === null) {
        // If one card is selected.
        const updatedState = {
          ...state,
          secondCardId: payload,
          numAttempts: state.numAttempts + 1,
        };

        // Check if cards match after the player has selected two cards.
        const itemId = state.cards[payload].itemId;
        if (itemId === state.cards[state.firstCardId].itemId) {
          return {
            ...updatedState,
            secondCardId: payload,
            lastItemMatched: itemId,
            items: state.items.map((item, index) => (
              index === itemId ?
              { ...item, matched: true } :
              item
            )),
          };
        }

        return updatedState;
      } else {
        // If two cards are selected.
        return {
          ...state,
          firstCardId: payload,
          secondCardId: null,
        };
      }
    case unflipCards.type:
      return {
        ...state,
        firstCardId: null,
        secondCardId: null,
      };
    default:
  }

  return state;
}

const INITIAL_TIMER_STATE = {
  millisecondsElapsed: 0,
  secondsElapsed: 0,
  timeElapsedString: '0:00',
};

function reduceGameTimer(state = INITIAL_TIMER_STATE, { type, payload }) {
  if (type === startGame.type) {
    return INITIAL_TIMER_STATE;
  } else if (type === updateGameTimer.type) {
    // Store the milliseconds elapsed instead of just seconds so the timer is more accurate.
    const millisecondsElapsed = state.millisecondsElapsed + payload;
    const secondsElapsed = Math.floor(millisecondsElapsed / 1000);

    return {
      millisecondsElapsed,
      secondsElapsed,
      timeElapsedString: (
        // Don't re-format the string if the number of seconds hasn't changed yet.
        secondsElapsed !== state.secondsElapsed ?
          formatMinutes(secondsElapsed) :
          state.timeElapsedString
      ),
    };
  }

  return state;
}

function formatMinutes(secondsElapsed) {
  // Formats the game.millisecondsElapsed as a "minutes:seconds" string.
  const minutes = Math.floor(secondsElapsed / 60);
  const seconds = secondsElapsed % 60;
  const secondsString = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${secondsString}`;
}
