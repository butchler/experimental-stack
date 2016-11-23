import { PropTypes } from 'react';
import { Record } from 'immutable';
import { Reducer, subscriber } from 'globals/store';
import { withTasks, task } from 'helpers/react-task';
import { setGoalItems, setGoalError } from 'constants/actions';
import { GOAL_URL } from 'constants/config';
import { do, fetch } from 'helpers/observable';
import GoalLoaderView from './GoalLoaderView';

const State = Record({ goalLoaded: false, errorMessage: null });

export const goalLoaderReducer = Reducer(State(), [
  [setGoalItems, () => State({ goalLoaded: true })],
  [setGoalError, errorMessage => State({ goalLoaded: false, errorMessage })],
]);

const mapPropsToTasks = ({ setGoalItems, setGoalError }) => [
  task(loadGoal, { fetchGoal: () => fetch(GOAL_URL), setGoalItems, setGoalError }),
];
const taskPropTypes = {
  setGoalItems: PropTypes.func.isRequired,
  setGoalError: PropTypes.func.isRequired,
};

const loadGoal = getProps =>
  getProps().fetchGoal()::do(
    null,
    error => getProps().setGoalError(`Error fetching goal data: ${error}`),
    request => {
      if (request.status === 200 && request.response) {
        let items;

        try {
          items = parseGoalItems(request.response);
        } catch (error) {
          getProps().setGoalError(`There was a problem parsing the goal data: ${error}`);
          return;
        }

        getProps().setGoalItems(items);
      } else {
        getProps().setGoalError(
          `There was a problem loading the goal data. (Request status ${request.status})`);
      }
    }
  );

const parseGoalItems = goalJSON => (
  JSON.parse(goalJSON).goal_items.map(itemData => ({
    cue: itemData.item.cue.text,
    response: itemData.item.response.text,
  }))
);

export default subscriber(goalLoaderReducer, {
  actions: { setGoalItems, setGoalError }
})(
  withTasks(mapPropsToTasks, taskPropTypes)(GoalLoaderView)
);
