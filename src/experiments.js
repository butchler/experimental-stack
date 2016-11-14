// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { createStoreInstance } from 'globals/store';
import Provider from 'helpers/Provider';
import QuizList from 'components/QuizList';
import { init } from 'constants/actions';

const store = createStoreInstance();

store.dispatch(init.create());

ReactDOM.render(
  <Provider store={store}>
    <QuizList />
  </Provider>
);

// globals/store.js
import Store from 'helpers/Store';

export default new Store();

// helpers/Store.js
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
      if (actionHandlers.hasOwnProperty(action.type)) {
        throw new Error(`Reducer contained two separate handlers for the action type '${action.type}'.`);
      }

      actionHandlers[action.type] = handler;
    });

    const reducer = {
      id,
      initialState: initialState,
      actionHandlers,
    };

    this.reducer[id] = reducer;
    this.nextReducerId += 1;

    return reducer;
  }

  Action(type, mapArgsToPayload) {
    if (this.actions.hasOwnProperty(type)) {
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
    Object.keys(this.reducers).forEach(reducerId => {
      const reducer = this.reducers[reducerId];

      reducerStates[reducerId] = reducer.initialState;
      reducerCallbacks[reducerId] = {};

      Object.keys(reducer.actionHandlers).forEach(actionType => {
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
        reducerIds.forEach(reducerId => {
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
          Object.keys(callbacks).forEach(key => {
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

// helpers/Provider.js
import React, { PropTypes } from 'react';

export default class Provider extends React.Component {
  constructor() {
    super();
  }

  getChildContext() {
    return {
      onReducerUpdated: this.props.store.onReducerUpdated,
      dispatch: this.props.store.dispatch,
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

Provider.propTypes = {
  store: PropTypes.shape({
    onReducerUpdated: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

Provider.childContextTypes = {
  onReducerUpdated: PropTypes.func,
};

// helpers/subscribe.js
export default function subscribe(reducer, actions, mapStateAndPropsToProps = defaultMapStateAndProps) {
  return ViewComponent => {
    class Subscriber extends React.Component {
      constructor() {
        super();

        this.state = {
          reducerState: reducer.initialState,
        };

        this.unsubscribe = this.context.onReducerUpdated(reducer, reducerState => this.setState({ reducerState }));

        this.dispatchProps = {};
        const dispatch = this.context.dispatch;
        Object.keys(actions).forEach(propName => {
          const createAction = actions[propName].create;
          dispatchProps[propName] = (...args) => dispatch(createAction(...args));
        });
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        const props = mapStateAndPropsToProps(this.state.reducerState, this.props);
        let propsObject;

        if (props && typeof props.toJS === 'function') {
          propsObject = props.toJS();
        } else {
          propsObject = props;
        }

        return <ViewComponent {...this.dispatchProps} {...propsObject} />;
      }
    }

    Subscriber.contextTypes = {
      onReducerUpdated: PropTypes.func,
      dispatch: PropTypes.func,
    };

    return Subscriber;
  };
}

function defaultMapStateAndProps(state, props) {
  let stateObject;

  if (state && typeof state.toJS === 'function') {
    stateObject = state.toJS();
  } else {
    stateObject = state;
  }

  return { ...stateObject, ...props };
}

// QuizList.js
import { Record, List } from 'immutable';
import { Reducer } from 'globals/store';
import { addQuiz, removeQuiz } from 'constants/actions';
import subscribe from 'helpers/subscribe';
import QuizListView from './QuizListView';

const State = Record({ quizIds: List() });

export const quizListReducer = Reducer(State(), {
  [addQuiz]: (state, id) => state.set('quizIds', state.quizIds.push(id)),
  [removeQuiz]: (state, id) => state.set('quizIds', state.quizIds.filter(quizId => quizId !== id)),
});

export default subscribe(
  quizListReducer,
  { addQuiz, removeQuiz }
)(QuizListView);

// Quiz.js
import { Record, List, Map } from 'immutable';
import { Reducer } from 'globals/store';
import { addQuiz, removeQuiz, addQuestion, removeQuestion } from 'constants/actions';
import subscribe from 'helpers/subscribe';
import QuizView from './QuizView';

const State = Record({ quizzes: Map() });
const Quiz = Record({ questionIds: List() });

export const quizzesReducer = Reducer(State(), [
  [addQuiz, (state, id) => state.setIn(['quizzes', id], Quiz({ questionIds: List(['first']) }))],
  [removeQuiz, (state, id) => state.removeIn(['quizzes', id])],
  [addQuestion, (state, { quizId, questionId }) => state.updateIn(
    ['quizzes', quizId],
    Quiz(),
    quiz => quiz.questionIds.push(questionId)
  )],
  [removeQuestion, (state, { quizId, questionId }) => state.updateIn(
    ['quizzes', quizId],
    Quiz(),
    quiz => quiz.questionIds.filter(id => id !== questionId)
  )],
]);

export default subscribe(
  quizzesReducer,
  { addQuestion, removeQuestion },
  ({ quizzes }, { id }) => quizzes.get(id, Quiz())
)(QuizView);

// Question.js
import { Record, List, Map } from 'immutable';
import { Reducer } from 'globals/store';
import { removeQuiz, removeQuestion, addAnswer, removeAnswer, setQuestionText } from 'constants/actions';
import subscribe from 'helpers/subscribe';
import QuestionView from './QuestionView';

const State = Record({ quizzes: Map(), });
const Question = Record({ text: '', answerIds: List() });

export const questionsReducer = Reducer(State(), [
  [removeQuiz, (state, id) => state.removeIn(['quizzes', id])],
  // It's not technically necessary to initialize the question because Question() will be used as
  // the default value if a given question is not found.
  //[addQuestion, (state, { quizId, questionId }) => state.setIn(['quizzes', quizId, questionId], Question())],
  [removeQuestion, (state, { quizId, questionId }) => state.removeIn(['quizzes', quizId, questionId])],
  [addAnswer, (state, { quizId, questionId, answerId }) => state.updateIn(
    ['quizzes', quizId, questionId],
    Question(),
    question => question.updateIn('answerIds', ids => ids.push(answerId))
  )],
  [removeAnswer, (state, { quizId, questionId, answerId }) => state.updateIn(
    ['quizzes', quizId, questionId, 'answerIds'],
    List(),
    ids => ids.filter(id => id != answerId)
  )],
  [setQuestionText, (state, { quizId, questionId, text }) => state.updateIn(
    ['quizzes', quizId, questionId],
    Question(),
    question => question.set('text', text)
  )],
]);

export default subscribe(
  questionsReducer,
  { addAnswer, removeAnswer, setQuestionText },
  ({ quizzes }, { quizId, id }) => quizzes.getIn([quizId, id], Question())
)(QuestionView);

// Answer.js
import { Record, List, Map } from 'immutable';
import { Reducer } from 'globals/store';
import { removeQuiz, removeQuestion, removeAnswer, setAnswerText, toggleAnswerIsCorrect } from 'constants/actions';
import subscribe from 'helpers/subscribe';
import AnswerView from './AnswerView';

const State = Record({ quizzes: Map() });
const Answer = Record({ text: '', isCorrect: false });

export const answersReducer(State(), [
  [removeQuiz, (state, id) => state.removeIn(['quizzes', id])],
  [removeQuestion, (state, { quizId, questionId }) => state.removeIn(['quizzes', quizId, questionId])],
  [removeAnswer, (state. { quizId, questionId, answerId }) => state.removeIn(['quizzes', quizId, questionId, answerId])],
  [setAnswerText, (state, { quizId, questionId, answerId, text }) => state.updateIn(
    ['quizzes', quizId, questionId, answerId],
    Answer(),
    answer => answer.set('text', text)
  )],
  [toggleAnswerIsCorrect, (state, { quizId, questionId, answerId }) => state.updateIn(
    ['quizzes', quizId, questionId, answerId],
    Answer(),
    answer => answer.update('isCorrect', isCorrect => !isCorrect)
  )],
]);

export default subscribe(
  answersReducer,
  { setAnswerText, toggleAnswerIsCorrect },
  ({ answers }, { quizId, questionId, id }) => quizzes.getIn([quizId, questionId, id], Answer())
)(AnswerView);
