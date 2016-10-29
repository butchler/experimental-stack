import { connect } from 'react-redux';
import { LANGUAGES } from 'constants/i18n';
import { setLanguage } from 'constants/actions';
import { LANGUAGE_SWITCHER } from 'reducers/app';
import LanguageSwitcherView from './LanguageSwitcherView';

export function reduceLanguageSwitcher(currentLanguage) {
  return {
    currentLanguage,
    languages: LANGUAGES,
  };
}

export default connect(
  state => state[LANGUAGE_SWITCHER],
  { setLanguage },
)(LanguageSwitcherView);
