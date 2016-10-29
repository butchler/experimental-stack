import { setLanguage } from 'constants/actions';
import { reduceGoalLoaderView } from 'components/GoalLoader';

export const CURRENT_LANGUAGE = 'currentLanguage';
export const GOAL_LOADER = 'goalLoader';

export default function appReducer(state = {}, action) {
  return {
    [CURRENT_LANGUAGE]: reduceCurrentLanguage(state[CURRENT_LANGUAGE], action),
    [GOAL_LOADER]: reduceGoalLoaderView(state[GOAL_LOADER], action),
  };
}

function reduceCurrentLanguage(currentLanguage, { type, payload }) {
  if (type === setLanguage.type) {
    return payload;
  }

  return currentLanguage;
}
