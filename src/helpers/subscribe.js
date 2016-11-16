import React, { PropTypes } from 'react';
import { Map, Record } from 'immutable';

export default function subscribe(
  reducer,
  actions,
  mapStateAndPropsToProps = state => state
) {
  return (ViewComponent) => {
    class Subscriber extends React.Component {
      constructor(props, context) {
        super(props, context);

        this.state = {
          reducerState: reducer.initialState,
        };

        this.unsubscribe = context.onReducerUpdated(
          reducer,
          reducerState => this.setState({ reducerState })
        );

        this.dispatchProps = {};
        const dispatch = context.dispatch;
        Object.keys(actions).forEach((propName) => {
          const createAction = actions[propName];
          this.dispatchProps[propName] = (...args) => dispatch(createAction(this.props, ...args));
        });
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        let stateProps = mapStateAndPropsToProps(this.state.reducerState, this.props);

        if (stateProps instanceof Record || stateProps instanceof Map) {
          stateProps = stateProps.toObject();
        }

        return <ViewComponent {...this.dispatchProps} {...stateProps} {...this.props} />;
      }
    }

    Subscriber.contextTypes = {
      onReducerUpdated: PropTypes.func,
      dispatch: PropTypes.func,
    };

    return Subscriber;
  };
}
