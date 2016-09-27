import React from 'react';
import { observer, inject } from 'mobx-react';
import { setGoalItems } from 'constants/actions';
import GameLoaderView from 'components/GameLoaderView';

@inject('store', 'dispatch')
@observer
export default class GoalLoader extends Component {
  componentDidMount() {
    // TODO: Make fake API request.
    this.props.dispatch(setGoalItems([
      { cue: 'cue', response: 'response' },
      { cue: 'dog', response: 'perro' },
    ]));
  }

  render() {
    const { goal } = this.props.store.ui;

    const goalLoaded = !!goal.items;

    if (goalLoaded) {
      return <Game />;
    } else {
      return <GoalLoaderView errorMessage={goal.errorMessage} />
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
