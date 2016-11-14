import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import getTranslation from 'helpers/i18n';
import { TRANSLATOR } from 'reducers/app';

export function reduceTranslator(currentLanguage) {
  return {
    translate: label => getTranslation(currentLanguage, label),
  };
}

export default connect(state => state[TRANSLATOR])(T);

function T({ translate, children }) {
  return <span>{translate(children)}</span>;
}

T.propTypes = {
  children: PropTypes.string.isRequired,
  translate: PropTypes.func.isRequired,
};
