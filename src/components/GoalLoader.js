import React, { PropTypes } from 'react';
import injector from 'helpers/injector';
import { setGoalItems } from 'constants/actions';
import { GOAL_URL } from 'constants/config';
import GameLauncher from 'components/game-launcher/GameLauncher';
import GoalLoaderView from './GoalLoaderView';

// Controller component
@injector(({ store, dispatch }) => ({
  items: store.ui.goalLoader.items,
  goalLoaded: !!store.ui.goalLoader.items,
  errorMessage: store.ui.goalLoader.errorMessage,
  onSuccess: items => dispatch(setGoalItems(items)),
  onError: message => dispatch(setGoalItems.error(message)),
}))
export default class GoalLoader extends Component {
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
            this.props.onError("There was a problem parsing the goal data.");
            return;
          }

          this.props.onSuccess(items);
        } else {
          this.props.onError("There was a problem loading the goal data.");
        }
      }
    };

    request.open('GET', GOAL_URL);
    request.send();
  }

  render() {
    const { goalLoaded, errorMessage } = this.props;

    if (goalLoaded) {
      return <GameLauncher />;
    } else {
      return <GoalLoaderView errorMessage={errorMessage} />
    }
  }
}

GoalLoader.propTypes = {
  items: PropTypes.array,
  errorMessage: PropTypes.string,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

// UI state store
export class GoalLoaderStore {
  @observable items;
  @observable errorMessage;

  @action dispatch(action) {
    if (action.type === setGoalItems.type) {
      if (action.error) {
        this.items = undefined;
        this.errorMessage = payload;
      } else {
        this.items = payload;
        this.errorMessage = undefined;
      }
    }
  }
}

function parseGoalItems(goalJSON) {
  // TODO
  //const items = JSON.parse(goalJSON).goal_items;

  return [
    { cue: 'cue', response: 'response' },
    { cue: 'dog', response: 'perro' },
    { cue: 'cat', response: 'gato' },
  ];
}
