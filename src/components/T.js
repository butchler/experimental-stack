import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { getTranslation } from 'helpers/i18n';

function T({ getTranslation, children }) {
  const label = React.Children.only(children);

  return getTranslation(label);
}

T.propTypes = {
  getTranslation: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default inject(({ store }) => ({
  getTranslation: label => getTranslation(store.ui.currentLanguage, label),
}))(observer(T));
