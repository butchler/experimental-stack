import { Record } from 'immutable';
import { Reducer, subscriber } from 'globals/store';
import { LANGUAGES } from 'constants/i18n';
import { setLanguage } from 'constants/actions';
import LanguageSwitcherView from './LanguageSwitcherView';

const State = Record({ languages: LANGUAGES, currentLanguage: 'en' });

export const languageSwitcherReducer = Reducer(State(), [
  [setLanguage, (state, language) => state.set('currentLanguage', language)],
]);

export default subscriber(languageSwitcherReducer, {
  actions: { setLanguage },
})(LanguageSwitcherView);
