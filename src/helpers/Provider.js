import React, { PropTypes } from 'react';

export default class Provider extends React.Component {
  // TODO: Warn if `store` prop changes.

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
  children: PropTypes.node,
};

Provider.childContextTypes = {
  onReducerUpdated: PropTypes.func,
  dispatch: PropTypes.func,
};
