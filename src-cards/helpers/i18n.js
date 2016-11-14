import { STRINGS, DEFAULT_LANGUAGE } from 'constants/i18n';

export default function getTranslation(languageCode, label) {
  if (typeof languageCode !== 'string') {
    throw new TypeError('languageCode must be a string');
  }

  if (STRINGS[label]) {
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
