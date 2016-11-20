import { Record } from 'immutable';
import { Reducer } from 'globals/store';
import subscribe from 'helpers/subscribe';
import { set } from 'helpers/mutators';
import { LANGUAGES } from 'constants/i18n';
import { setLanguage } from 'constants/actions';
import LanguageSwitcherView from './LanguageSwitcherView';

const State = Record({ languages: LANGUAGES, currentLanguage: 'en' });

export const languageSwitcherReducer = Reducer(State(), [
  [setLanguage, language => set('currentLanguage', language)],
]);

export default subscribe(languageSwitcherReducer, { setLanguage })(LanguageSwitcherView);
