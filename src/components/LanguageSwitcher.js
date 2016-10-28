import injector from 'helpers/injector';
import { LANGUAGES } from 'constants/i18n';
import { setLanguage } from 'constants/actions';
import LanguageSwitcherView from './LanguageSwitcherView';

// TODO: Tie this to the React context instead of it being global.
const state$ = new Subject();
// Subcribe to the global action stream and reduce the state.
action$::reducer(reduceCurrentLanguage).subscribe(state$);
// Save the state globally for debugging purposes
state$.subscribe(state => globalState.languageSwitcher = state);
// Map the state stream into each component's prop stream.
export default mapPropStream(prop$ => state$::map(mapStateToProps))(LanguageSwitcherView);

export function reduceCurrentLanguage(state = 'en', action) {
  if (action.type === setLanguage.type) {
    return action.payload;
  }

  return state;
}

export function mapStateToProps(state) {
  return {
    currentLanguage: state,
    languages: LANGUAGES,
    setLanguage: languageCode => dispatch(setLanguage(languageCode)),
  };
}
