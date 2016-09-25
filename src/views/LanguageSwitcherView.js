import './styles/language-switcher.css';

import { observer } from 'mobx-react';
import React from 'react';

import { LANGUAGES } from '../translations';
import * as dispatcher from '../dispatcher';
import { setLanguage } from '../actions';

@observer
export default class LanguageSwitcherView extends React.Component {
    constructor() {
        super();

        this.switchLanguage = (event) => {
            const languageCode = event.currentTarget.value;

            dispatcher.dispatch(setLanguage.create(languageCode));
        };
    }

    render() {
        return <select
                className="language-switcher"
                value={this.props.store.currentLanguage}
                onChange={this.switchLanguage}>
            {LANGUAGES.map((language) => {
                return <option
                        value={language.code}
                        key={language.code}>
                    {language.name}
                </option>;
            })}
        </select>;
    }
}
