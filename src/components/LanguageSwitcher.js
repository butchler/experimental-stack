import injector from 'helpers/injector';
import { LANGUAGES } from 'constants/i18n';
import { setLanguage } from 'constants/actions';
import LanguageSwitcherView from './LanguageSwitcherView';

export default injector(({ store, dispatch }) => ({
  currentLanguage: store.ui.currentLanguage,
  languages: LANGUAGES,
  setLanguage: languageCode => dispatch(setLanguage(languageCode)),
}))(LanguageSwitcherView);
