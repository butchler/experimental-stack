import 'components/game/styles/game.css';

import React, { PropTypes } from 'react';
import Card from 'components/game/Card';
import T from 'components/T';

export default function GameView({ timeElapsed, numAttempts, cards, onQuit }) {
  return (
    <div className="game">
      <div className="game-info">
        <span className="game-time">
          <span className="label"><T>timeElapsed</T></span> {timeElapsed}
        </span>
        <span className="game-attempts">
          <span className="label"><T>attemptsMade</T></span> {numAttempts}
        </span>
      </div>

      <div className="game-cards">
        {cards.map(card => <Card key={card.id} card={card} />)}
      </div>

      <button className="button" onClick={onQuit}><T>quitGame</T></button>
    </div>
  );
}

GameView.propTypes = {
  timeElapsed: PropTypes.string.isRequired,
  numAttempts: PropTypes.number.isRequired,
  cards: PropTypes.object,
  onQuit: PropTypes.func.isRequired,
};
