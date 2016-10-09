// Import CSS first so that CSS imported in other files comes after the
// contents of normalize.css in the generated bundle.css.
import 'components/styles/normalize.css';
import 'components/styles/base.css';
import 'components/styles/app.css';

import React from 'react';
import LanguageSwitcher from 'components/LanguageSwitcher';
import GoalLoader from 'components/GoalLoader';

export default function App() {
  return (
    <div>
      <header className="header">
        <div className="inner-container">
          <div className="logo-iknow"></div>

          <LanguageSwitcher />
        </div>
      </header>

      <div className="primary-content inner-container">
        <div className="app">
          <GoalLoader />
        </div>
      </div>
    </div>
  );
}
