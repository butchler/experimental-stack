export default class Store {
  constructor() {
    this.actions = {};
    this.reducers = {};
    this.nextReducerId = 0;
  }

  Reducer(initialState, handlerList) {
    const id = this.nextReducerId;
    const actionHandlers = {};

    handlerList.forEach(([action, handler]) => {
      if ({}.hasOwnProperty.call(actionHandlers, action.type)) {
        throw new Error(`Reducer contained two separate handlers for the action type '${action.type}'.`);
      }

      actionHandlers[action.type] = handler;
    });

    const reducer = {
      id,
      initialState,
      actionHandlers,
    };

    this.reducer[id] = reducer;
    this.nextReducerId += 1;

    return reducer;
  }

  Action(type, mapArgsToPayload) {
    if ({}.hasOwnProperty.call(this.actions, type)) {
      throw new Error(`An action with the type '${type}' already exists.`);
    }

    const action = {
      type,
      create: (...args) => ({
        type,
        payload: mapArgsToPayload(...args),
      }),
    };

    this.actions[type] = action;

    return action;
  }

  createStoreInstance() {
    const actionTypeToReducerIds = {};
    const reducerStates = {};
    const reducerCallbacks = {};
    let nextCallbackId = 0;

    // Initialize reducer state and callback sets.
    Object.keys(this.reducers).forEach((reducerId) => {
      const reducer = this.reducers[reducerId];

      reducerStates[reducerId] = reducer.initialState;
      reducerCallbacks[reducerId] = {};

      Object.keys(reducer.actionHandlers).forEach((actionType) => {
        if (!actionTypeToReducerIds[actionType]) {
          actionTypeToReducerIds[actionType] = [reducerId];
        } else {
          actionTypeToReducerIds[actionType].push(reducerId);
        }
      });
    });

    return {
      dispatch(action) {
        const reducerIds = actionTypeToReducerIds[action.type];
        reducerIds.forEach((reducerId) => {
          const state = reducerStates[reducerId];
          const reducer = this.reducers[reducerId];
          const handler = reducer.actionHandlers[action.type];
          let newState;

          // Call reducer's handler for the dispatched action.
          try {
            newState = handler(state, action);
          } catch (error) {
            // TODO: Throw errors instead of just logging them?
            console.log(`Error in action handler for '${action.type}':`, error);
            return;
          }

          // We don't need to do anything if the state didn't change.
          if (state === newState) {
            return;
          }

          // Update state.
          reducerStates[reducerId] = newState;

          // Call reducer callbacks.
          const callbacks = reducerCallbacks[reducerId];
          Object.keys(callbacks).forEach((key) => {
            const callback = callbacks[key];
            try {
              callback(newState);
            } catch (error) {
              // TODO: Require names for reducers, for debugging purposes?
              console.log('Error in subscriber:', error);
            }
          });
        });

        return action;
      },
      onReducerUpdated(reducer, callback) {
        // Save callback id.
        const callbackId = nextCallbackId;
        nextCallbackId += 1;

        // Add callback.
        const callbacks = reducerCallbacks[reducer.id];
        callbacks[callbackId] = callback;

        // Create unsubscribe function.
        const unsubscribe = () => {
          delete callbacks[callbackId];
        };

        return unsubscribe;
      },
    };
  }
}
