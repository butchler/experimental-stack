import { reduceGoalLoader } from 'components/GoalLoader';
import { reduceTranslator } from 'components/T';
import { reduceLanguageSwitcher } from 'components/LanguageSwitcher';
import { reduceGameLauncher } from 'components/game-launcher/GameLauncher';
import { reduceGameResults } from 'components/game-launcher/GameResults';
import { reduceStartGameButtons } from 'components/game-launcher/StartGameButtons';
import { reduceGame } from 'components/game/Game';
import { reduceCards } from 'components/game/Card';
import reduceGoalItems from 'reducers/goalItems';
import reduceCurrentLanguage from 'reducers/currentLanguage';
import reduceGameState from 'reducers/gameState';
import reduceGameTimer from 'reducers/gameTimer';

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
