import { observer, inject } from 'mobx-react';
import { LANGUAGES } from 'constants/translations';
import { setLanguage } from 'constnats/actions';
import LanguageSwitcherView from 'components/LanguageSwitcherView';

export default inject(({ store, dispatch }) => {
  return {
    currentLanguage: store.ui.currentLanguage,
    languages: LANGUAGES,
    setLanguage: languageCode => dispatch(setLanguage(languageCode)),
  };
})(observer(LanguageSwitcherView));
