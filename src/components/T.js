import React, { PropTypes } from 'react';
import injector from 'helpers/injector';
import getTranslation from 'helpers/i18n';

function T({ translate, children }) {
  const label = React.Children.only(children);

  return translate(label);
}

T.propTypes = {
  translate: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default injector(({ store }) => ({
  translate: label => getTranslation(store.ui.currentLanguage, label),
}))(T);
