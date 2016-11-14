import { setGoalItems } from 'constants/actions';

export default function reduceGoalItems(state = [], { type, payload }) {
  if (type === setGoalItems.type) {
    return payload;
  }

  return state;
}
