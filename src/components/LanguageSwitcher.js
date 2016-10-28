import mapPropStream from 'helpers/mapPropStream';
import { map } from 'helpers/operators';
import { LANGUAGES } from 'constants/i18n';
import { setLanguage } from 'constants/actions';
import { dispatch, currentLanguage$ } from 'globals/streams';
import LanguageSwitcherView from './LanguageSwitcherView';

export default mapPropStream(prop$ => currentLanguage$::map(mapStateToProps))(LanguageSwitcherView);

export function mapStateToProps(currentLanguage) {
  return {
    currentLanguage,
    languages: LANGUAGES,
    setLanguage: languageCode => dispatch(setLanguage(languageCode)),
  };
}
