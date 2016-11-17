import React, { PropTypes } from 'react';
import { Reducer } from 'globals/store';
import { subscribe } from 'helpers/subscribe';
import { set } from 'helpers/mutators';
import { setLanguage } from 'constants/actions';
import getTranslation from 'helpers/i18n';
import { DEFAULT_LANGUAGE } from 'constants/i18n';

export const tReducer = Reducer({
  translate: label => getTranslation(DEFAULT_LANGUAGE.code, label),
}, [
  [setLanguage, language => set('translate', label => getTranslation(language, label))],
]);

export default subscribe(tReducer)(T);

function T({ translate, children }) {
  return <span>{translate(children)}</span>;
}

T.propTypes = {
  children: PropTypes.string.isRequired,
  translate: PropTypes.func.isRequired,
};
