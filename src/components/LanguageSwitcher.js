import { connect } from 'react-redux';
import { LANGUAGES } from 'constants/i18n';
import { setLanguage } from 'constants/actions';
import { CURRENT_LANGUAGE } from 'reducers/app';
import LanguageSwitcherView from './LanguageSwitcherView';

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcherView);

function mapStateToProps(state) {
  return {
    currentLanguage: state[CURRENT_LANGUAGE],
    languages: LANGUAGES,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setLanguage: languageCode => dispatch(setLanguage(languageCode)),
  };
}
