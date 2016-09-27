import './styles/language-switcher.css';

import React, { Component, PropTypes } from 'react';

export default class LanguageSwitcherView extends Component {
  constructor() {
    super();

    this.onChange = event => {
      const languageCode = event.currentTarget.value;

      this.props.setLanguage(languageCode);
    };
  }

  render() {
    const { languages, currentLanguage } = this.props;

    return (
      <select className="language-switcher" value={currentLanguage} onChange={this.onChange}>
        {languages.map(({ code, name }) =>
          <option value={code} key={code}>{name}</option>
        )}
      </select>
    );
  }
}

LanguageSwitcherView.propTypes = {
  currentLanguage: PropTypes.string,
  languages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  setLanguage: PropTypes.func.isRequired,
};
