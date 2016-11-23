import React from 'react';
import { Map, Record } from 'immutable';

const Store = () => {
  const actions = {};
  const reducers = {};

  let isFinalized = false;
  const actionTypeToReducerNames = {};
  const reducerStates = {};
  const reducerCallbacks = {};
  let nextCallbackId = 0;

  const Reducer = (name, initialState, handlerList) => {
    if (isFinalized) {
      throw new Error('Cannot add reducers after store is finalized.');
    }

    if ({}.hasOwnProperty.call(reducers, name)) {
      throw new Error(`A reducer with the name '${name}' already exists.`);
    }

    const reducer = createReducer(name, initialState, handlerList);

    reducers[name] = reducer;

    return reducer;
  };

  const Action = (type, mapPayload) => {
    if (isFinalized) {
      throw new Error('Cannot add actions after store is finalized.');
    }

    if ({}.hasOwnProperty.call(actions, type)) {
      throw new Error(`An action with the type '${type}' already exists.`);
    }

    const action = createAction(type, mapPayload);

    actions[type] = action;

    return action;
  };

  const getReducers = () => reducers;

  const getActions = () => actions;

  const finalize = () => {
    if (isFinalized) {
      return;
    }

    // Build action -> reducer mapping.
    Object.keys(reducers).forEach((reducerName) => {
      const actionTypes = reducers[reducerName].actionTypes;
      actionTypes.forEach((actionType) => {
        actionTypeToReducerNames[actionType] = actionTypeToReducerNames[actionType] || [];
        actionTypeToReducerNames[actionType].push(reducerName);
      });
    });

    // Initialize reducer state and callback sets.
    Object.keys(reducers).forEach((reducerName) => {
      reducerStates[reducerName] = reducers[reducerName].initialState;
      reducerCallbacks[reducerName] = {};
    });

    isFinalized = true;
  };

  const unfinalize = () => {
    if (!isFinalized) {
      return;
    }

    Object.keys(actionTypeToReducerNames).forEach((actionType) => {
      delete actionTypeToReducerNames[actionType];
    });

    Object.keys(reducerStates).forEach((reducerName) => {
      delete reducerStates[reducerName];
    });

    Object.keys(reducerCallbacks).forEach((reducerName) => {
      delete reducerCallbacks[reducerName];
    });

    isFinalized = false;
  };

  const getReducerStates = () => {
    if (!isFinalized) {
      throw new Error('Cannot get reducer states before store is finalized.');
    }

    return reducerStates;
  };

  const dispatch = (action) => {
    if (!isFinalized) {
      throw new Error('Cannot dispatch actions before store is finalized.');
    }

    const type = action.type;

    if (!{}.hasOwnProperty.call(actions, type)) {
      throw new Error('Tried to dispatch an action that was not added to the store.');
    }

    const reducerNames = actionTypeToReducerNames[type];

    if (!reducerNames) {
      console.warn(`There are no reducers that handle '${type}' actions.`);
      return action;
    }

    reducerNames.forEach((reducerName) => {
      const state = reducerStates[reducerName];
      let newState;

      // Call reducer's handler for the dispatched action.
      try {
        newState = reducers[reducerName](state, action);
      } catch (error) {
        // TODO: Throw errors instead of just logging them?
        console.warn(`Error in '${reducerName}' reducer for '${type}' action:`, error);
        return;
      }

      // We don't need to do anything if the state didn't change.
      if (state === newState) {
        return;
      }

      // Update state.
      reducerStates[reducerName] = newState;

      // Call reducer callbacks.
      const callbacks = reducerCallbacks[reducerName];
      Object.keys(callbacks).forEach((key) => {
        try {
          callbacks[key](newState);
        } catch (error) {
          console.warn(`Error in reducer state subscriber for '${reducerName}' reducer:`, error);
        }
      });
    });

    return action;
  };

  const onReducerUpdated = (reducer, callback) => {
    if (!isFinalized) {
      throw new Error('Cannot add state listeners before store is finalized.');
    }

    // Save callback id.
    const callbackId = nextCallbackId;
    nextCallbackId += 1;

    // Add callback.
    const callbacks = reducerCallbacks[reducer.name];
    callbacks[callbackId] = callback;

    // Create unsubscribe function.
    const unsubscribe = () => {
      delete callbacks[callbackId];
    };

    return unsubscribe;
  };

  const subscriber = (reducer, options) => {
    const reducerName = reducer.name;
    const { actions: actionCreators, mapState, mergeProps } = options;

    return (ViewComponent) => {
      class Subscriber extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
            reducerState: reducerStates[reducerName],
          };

          this.unsubscribe = onReducerUpdated(
            reducer,
            reducerState => this.setState({ reducerState })
          );

          this.dispatchers = {};
          if (actionCreators) {
            Object.keys(actionCreators).forEach((propName) => {
              const createAction = actionCreators[propName];
              this.dispatchers[propName] = (...args) => dispatch(createAction(this.props, ...args));
            });
          }
        }

        componentWillUnmount() {
          this.unsubscribe();
        }

        render() {
          let state = this.state.reducerState;

          if (mapState) {
            state = mapState(this.state.reducerState, this.props);
          }

          if (state instanceof Record || state instanceof Map) {
            state = state.toObject();
          }

          if (mergeProps) {
            return <ViewComponent {...mergeProps(this.props, state, this.dispatchers)} />;
          } else {
            return <ViewComponent {...state} {...this.dispatchers} {...this.props} />;
          }
        }
      }

      Subscriber.displayName = `Subscriber(${reducer.name})`;

      return Subscriber;
    };
  };

  return {
    Reducer,
    Action,
    getReducers,
    getActions,
    finalize,
    unfinalize,
    getReducerStates,
    dispatch,
    onReducerUpdated,
    subscriber,
  };
};

const createReducer = (name, initialState, handlerList) => {
  const actionHandlers = {};
  const actionTypes = [];

  handlerList.forEach(([action, handler]) => {
    if (!isAction(action) || typeof handler !== 'function') {
      throw new Error('Reducer handlers must be a pair of [action, handler function].');
    }

    if ({}.hasOwnProperty.call(actionHandlers, action.type)) {
      throw new Error(`Reducer contained two separate handlers for the action type '${action.type}'.`);
    }

    actionHandlers[action.type] = handler;
    actionTypes.push(action.type);
  });

  const reducerFunction = (state, action) => {
    const handler = actionHandlers[action.type];

    if (handler) {
      return handler(state, action.payload);
    } else {
      return state;
    }
  };

  Object.defineProperties(reducerFunction, {
    name: { value: name },
    initialState: { value: initialState },
    actionTypes: { value: actionTypes },
    reducerSecret: { value: REDUCER_SECRET },
  });

  return reducerFunction;
};
const REDUCER_SECRET = {};
export const isReducer = reducer => reducer && reducer.reducerSecret === REDUCER_SECRET;

const createAction = (type, mapPayload) => {
  if (typeof type !== 'string') {
    throw new Error('Action types must be strings.');
  }

  if (mapPayload && typeof mapPayload !== 'function') {
    throw new Error('Action second argument must a function');
  }

  const actionCreator = mapPayload ? (
    payload => ({ type, payload: mapPayload(payload) })
  ) : (
    payload => ({ type, payload })
  );

  Object.defineProperties(actionCreator, {
    type: { value: type },
    actionSecret: { value: ACTION_SECRET },
  });

  return actionCreator;
};
const ACTION_SECRET = {};
export const isAction = action => action && action.actionSecret === ACTION_SECRET;

export default Store;
