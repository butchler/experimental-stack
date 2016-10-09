import React, { PropTypes } from 'react';
import injector from 'helpers/injector';
import { getTranslation } from 'helpers/i18n';

function T({ getTranslation, children }) {
  const label = React.Children.only(children);

  return getTranslation(label);
}

T.propTypes = {
  getTranslation: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default injector(({ store }) => ({
  getTranslation: label => getTranslation(store.ui.currentLanguage, label),
}))(T);
