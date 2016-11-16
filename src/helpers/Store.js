export default function Store() {
  const actions = {};
  const reducers = {};
  let nextReducerId = 0;

  return {
    // TODO: Make propery prototypes for Action and Reducer.
    Reducer(initialState, handlerList) {
      const id = nextReducerId;
      const actionHandlers = {};

      handlerList.forEach(([action, handler]) => {
        if (typeof action !== 'function' || typeof handler !== 'function') {
          throw new Error('Reducer handlers must be a pair of action and handler function.');
        }

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

      reducers[id] = reducer;
      nextReducerId += 1;

      return reducer;
    },

    Action(type, mapPayload = payload => payload) {
      if ({}.hasOwnProperty.call(actions, type)) {
        throw new Error(`An action with the type '${type}' already exists.`);
      }

      const action = payload => ({
        type,
        payload: mapPayload(payload),
      });
      action.type = type;

      actions[type] = action;

      return action;
    },

    createStoreInstance() {
      const actionTypeToReducerIds = {};
      const reducerStates = {};
      const reducerCallbacks = {};
      let nextCallbackId = 0;

      // Initialize reducer state and callback sets.
      Object.keys(reducers).forEach((reducerId) => {
        const reducer = reducers[reducerId];

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

      // TODO: Add functions to get reducer state for debugging.
      return {
        dispatch(action) {
          const reducerIds = actionTypeToReducerIds[action.type] || [];
          reducerIds.forEach((reducerId) => {
            const state = reducerStates[reducerId];
            const reducer = reducers[reducerId];
            const handler = reducer.actionHandlers[action.type];
            let newState;

            // Call reducer's handler for the dispatched action.
            try {
              newState = handler(state, action.payload);
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
    },
  };
}
