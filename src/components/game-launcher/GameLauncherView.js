import React, { PropTypes } from 'react';
import T from 'components/T';
import Game from 'components/game/Game';
import GameResults from 'components/game-launcher/GameResults';
import StartGameButtons from 'components/game-launcher/StartGameButtons';
import { STARTED, RESULTS } from './GameLauncher';

// Constants
export const MODE_NOT_STARTED = 'not-started';
export const MODE_STARTED = 'started';
export const MODE_RESULTS = 'results';

export default function GameLauncherView({ mode }) {
  if (mode === MODE_STARTED) {
    return <Game />;
  } else if (mode === MODE_RESULTS) {
    return <GameResults />;
  } else {
    return (
      <div className="app-module">
        <h1 className="title"><T>memoryGame</T></h1>

        <p key="p-1" style={{ marginTop: '40px' }}><T>learnWordsParagraph</T></p>

        <p key="p-2" style={{ marginBottom: '40px' }}><T>flipOverParagraph</T></p>

        <StartGameButtons />
      </div>
    );
  }
}

GameLauncherView.propTypes = {
  mode: PropTypes.oneOf([MODE_NOT_STARTED, MODE_STARTED, MODE_RESULTS]).isRequired,
};
