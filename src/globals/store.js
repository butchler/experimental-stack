import Store from 'helpers/Store';
import { Map } from 'immutable';

const store = Store();

export const Action = store.Action;
export const Reducer = store.Reducer;

export const getState = () => Map(store.getReducerStates()).toJS();

const actions = [];
export const getActions = () => actions;
export const dispatch = (action) => {
  actions.push(action);

  return store.dispatch(action);
};

export const finalizeStore = store.finalize;

export const subscriber = store.subscriber;
