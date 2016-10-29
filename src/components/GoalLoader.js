/* global XMLHttpRequest */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { setGoalItems, setGoalError } from 'constants/actions';
import { GOAL_URL } from 'constants/config';
import { GOAL_LOADER } from 'reducers/app';
import GoalLoaderView from './GoalLoaderView';

// Export view state reducer.
export function reduceGoalLoader(viewState = { goalLoaded: false }, { type, payload }) {
  switch (type) {
    case setGoalItems.type:
      return { goalLoaded: true };
    case setGoalError.type:
      return { errorMessage: payload, goalLoaded: false };
    default:
      return viewState;
  }
}

// Controller component
class GoalLoader extends React.Component {
  componentDidMount() {
    if (this.props.goalLoaded) {
      return;
    }

    // Make an API request to load the goal items.
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200 && request.response) {
          let items;

          try {
            items = parseGoalItems(request.response);
          } catch (error) {
            this.props.setGoalError('There was a problem parsing the goal data.');
            return;
          }

          this.props.setGoalItems(items);
        } else {
          this.props.setGoalError('There was a problem loading the goal data.');
        }
      }
    };

    request.open('GET', GOAL_URL);
    request.send();
  }

  render() {
    return <GoalLoaderView {...this.props} />;
  }
}

GoalLoader.propTypes = {
  setGoalItems: PropTypes.func.isRequired,
  setGoalError: PropTypes.func.isRequired,
  goalLoaded: PropTypes.bool.isRequired,
};

function parseGoalItems(goalJSON) {
  const goalItems = JSON.parse(goalJSON).goal_items;

  return goalItems.map(itemData => ({
    cue: itemData.item.cue.text,
    response: itemData.item.response.text,
  }));
}

export default connect(
  state => state[GOAL_LOADER],
  { setGoalItems, setGoalError },
)(GoalLoader);
