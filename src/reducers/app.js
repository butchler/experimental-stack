import { setLanguage } from 'constants/actions';
import { reduceGoalLoader } from 'components/GoalLoader';
import { reduceTranslator } from 'components/T';
import { reduceLanguageSwitcher } from 'components/LanguageSwitcher';
import { reduceGameLauncher } from 'components/game-launcher/GameLauncher';

export const CURRENT_LANGUAGE = 'currentLanguage';
export const ALL_ITEMS_MATCHED = 'allItemsMatched';

export const TRANSLATOR = 'translator';
export const LANGUAGE_SWITCHER = 'languageSwitcher';
export const GOAL_LOADER = 'goalLoader';
export const GAME_LAUNCHER = 'gameLauncher';

export default function appReducer(state = {}, action) {
  const currentLanguage = reduceCurrentLanguage(state[CURRENT_LANGUAGE], action);
  const allItemsMatched = reduceAllItemsMatched(state[ALL_ITEMS_MATCHED], action);

  return {
    [CURRENT_LANGUAGE]: currentLanguage,
    [TRANSLATOR]: reduceTranslator(currentLanguage),
    [LANGUAGE_SWITCHER]: reduceLanguageSwitcher(currentLanguage),
    [GOAL_LOADER]: reduceGoalLoader(state[GOAL_LOADER], action),
    [GAME_LAUNCHER]: reduceGameLauncher(state[GAME_LAUNCHER], allItemsMatched, action),
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
