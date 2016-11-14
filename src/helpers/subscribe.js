import React, { PropTypes } from 'react';

export default function subscribe(
  reducer,
  actions,
  mapStateAndPropsToProps = defaultMapStateAndProps
) {
  return (ViewComponent) => {
    class Subscriber extends React.Component {
      constructor() {
        super();

        this.state = {
          reducerState: reducer.initialState,
        };

        this.unsubscribe = this.context.onReducerUpdated(
          reducer,
          reducerState => this.setState({ reducerState })
        );

        this.dispatchProps = {};
        const dispatch = this.context.dispatch;
        Object.keys(actions).forEach((propName) => {
          const createAction = actions[propName].create;
          this.dispatchProps[propName] = (...args) => dispatch(createAction(...args));
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

export function defaultMapStateAndProps(state, props) {
  let stateObject;

  if (state && typeof state.toJS === 'function') {
    stateObject = state.toJS();
  } else {
    stateObject = state;
  }

  return { ...stateObject, ...props };
}
