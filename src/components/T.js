import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';

function T({ strings, children }) {
  const label = React.Children.only(children);

  return strings[label];
}

T.propTypes = {
  strings: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.string.isRequired,
};

export default inject(({ store }) => ({ strings: store.ui.strings }))(observer(T));
