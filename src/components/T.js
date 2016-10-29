import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import getTranslation from 'helpers/i18n';
import { CURRENT_LANGUAGE } from 'reducers/app';

export default connect(mapStateToProps)(T);

function mapStateToProps(state) {
  return {
    translate: label => getTranslation(state[CURRENT_LANGUAGE], label),
  };
}

function T({ translate, children }) {
  return <span>{translate(children)}</span>;
}

T.propTypes = {
  children: PropTypes.string.isRequired,
  translate: PropTypes.func.isRequired,
};
