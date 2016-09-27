import React from 'react';
import { observer, inject } from 'mobx-react';
import GameLoaderView from 'components/GameLoaderView';
import { setGoalItems } from 'constants/actions';
import { GOAL_URL } from 'constants/config';

@inject(({ store, dispatch }) => ({
  items: store.ui.goalLoader.items,
  errorMessage: store.ui.goalLoader.errorMessage,
  dispatch,
}))
@observer
export default class GoalLoader extends Component {
  componentDidMount() {
    // Make an API request to load the goal items.
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200 && request.response) {
          this.props.dispatch(setGoalItems(parseGoalItems(request.response)));
        } else {
          this.props.dispatch(setGoalItems.error("There was a problem loading the goal data."));
        }
      }
    };

    request.open('GET', GOAL_URL);
    request.send();
  }

  render() {
    const { items, errorMessage } = this.props;

    const goalLoaded = !!items;

    if (goalLoaded) {
      return <Game />;
    } else {
      return <GoalLoaderView errorMessage={errorMessage} />
    }
  }
}

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
  ];
}
