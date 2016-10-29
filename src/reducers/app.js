import { setLanguage } from 'constants/actions';
import { reduceGoalLoader } from 'components/GoalLoader';
import { reduceTranslator } from 'components/T';
import { reduceLanguageSwitcher } from 'components/LanguageSwitcher';
import { reduceGameLauncher } from 'components/game-launcher/GameLauncher';
import { reduceGameResults } from 'components/game-launcher/GameResults';
import { reduceStartGameButtons } from 'components/game-launcher/StartGameButtons';

export const CURRENT_LANGUAGE = 'currentLanguage';
export const ALL_ITEMS_MATCHED = 'allItemsMatched';
export const TRANSLATOR = 'translator';
export const LANGUAGE_SWITCHER = 'languageSwitcher';
export const GOAL_LOADER = 'goalLoader';
export const GAME_LAUNCHER = 'gameLauncher';
export const GAME_RESULTS = 'gameResults';
export const START_GAME_BUTTONS = 'startGameButtons';

export default function appReducer(state = {}, action) {
  const currentLanguage = reduceCurrentLanguage(state[CURRENT_LANGUAGE], action);
  const allItemsMatched = reduceAllItemsMatched(state[ALL_ITEMS_MATCHED], action);

  // TODO
  const goalItems = [{ cue: 'cue', response: 'response' }];
  const gameItems = [];
  const gameElapsedTimeString = '0:00';
  const gameNumAttempts = 0;

  return {
    [CURRENT_LANGUAGE]: currentLanguage,
    [TRANSLATOR]: reduceTranslator(currentLanguage),
    [LANGUAGE_SWITCHER]: reduceLanguageSwitcher(currentLanguage),
    [GOAL_LOADER]: reduceGoalLoader(state[GOAL_LOADER], action),
    [GAME_LAUNCHER]: reduceGameLauncher(state[GAME_LAUNCHER], allItemsMatched, action),
    [GAME_RESULTS]: reduceGameResults(gameItems, gameElapsedTimeString, gameNumAttempts),
    [START_GAME_BUTTONS]: reduceStartGameButtons(goalItems),
  };
}

function reduceCurrentLanguage(currentLanguage = 'en', { type, payload }) {
  if (type === setLanguage.type) {
    return payload;
  }

  return currentLanguage;
}

function reduceAllItemsMatched(state, action) {
  // TODO
  return false;
}
