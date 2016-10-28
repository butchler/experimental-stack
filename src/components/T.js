import React, { PropTypes } from 'react';
import mapPropStream from 'helpers/mapPropStream';
import getTranslation from 'helpers/i18n';
import { currentLanguage$ } from 'globals/streams';

function T({ text }) {
  return <span>{text}</span>;
}

T.propTypes = {
  text: PropTypes.string.isRequired,
};

export default mapPropStream(props$ =>
  combineLatest([props$, currentLanguage$])::map((props, currentLanguage) => ({
    text: getTranslation(currentLanguage, props.children),
  })))(T);
