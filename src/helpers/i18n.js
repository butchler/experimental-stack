import { assert } from './util';
import { STRINGS, DEFAULT_LANGUAGE } from 'constants/i18n';

export function getTranslation(languageCode, label) {
  assert(typeof languageCode === 'string', "languageCode must be a string");

  if (STRINGS.hasOwnProperty(label)) {
    const string = STRINGS[label];

    return string[languageCode] ||
      string[regionlessLanguageCode(languageCode)] ||
      string[DEFAULT_LANGUAGE.code] ||
      label;
  } else {
    return label;
  }
}

function regionlessLanguageCode(languageCode) {
  return (languageCode.indexOf('-') !== -1) ?
    languageCode.substring(0, languageCode.indexOf('-')) :
    languageCode;
}
