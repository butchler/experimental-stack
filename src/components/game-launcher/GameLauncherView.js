import React, { PropTypes } from 'react';
import T from 'components/T';
import StartGameButtons from 'components/game-launcher/StartGameButtons';

export default function GameStarterView() {
  return (
    <div className="app-module">
      <h1 className="title"><T>memoryGame</T></h1>

      <p key="p-1" style={{marginTop: '40px'}}><T>learnWordsParagraph</T></p>

      <p key="p-2" style={{marginBottom: '40px'}}><T>flipOverParagraph</T></p>

      <StartGameButtons />
    </div>
  );
}

GameStarterView.propTypes = {};
