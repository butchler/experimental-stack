import 'components/styles/language-switcher.css';

import React, { Component, PropTypes } from 'react';
import withFunctions from 'helpers/withFunctions';

const LanguageSwitcherView = ({ languages, currentLanguage, onChange }) =>
  <select className="language-switcher" value={currentLanguage} onChange={this.onChange}>
    {languages.map(({ code, name }) =>
      <option value={code} key={code}>{name}</option>)}
  </select>;

LanguageSwitcherView.propTypes = {
  currentLanguage: PropTypes.string,
  languages: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};

const onChange = ({ setLanguage }, event) => setLanguage(event.currentTarget.value);
const functionPropTypes = {
  setLanguage: PropTypes.func.isRequired,
};

export default withFunctions({ onChange }, functionPropTypes)(LanguageSwitcherView);
