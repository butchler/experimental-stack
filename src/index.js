import React from 'react';
import ReactDOM from 'react-dom';
import AppStore from './stores/AppStore';
import AppView from './views/AppView';
import LanguageSwitcherView from './views/LanguageSwitcherView';

const store = new AppStore();

ReactDOM.render(
        <AppView store={store} />,
        document.getElementById('app-container')
);

ReactDOM.render(
        <LanguageSwitcherView store={store} />,
        document.getElementById('language-switcher-container')
);
