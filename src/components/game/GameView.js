import './styles/game.css';

import React, { PropTypes } from 'react';
import Card from 'components/game/Card';
import T from 'components/T';

export default function GameView({ timeElapsed, numAttempts, cards, onQuit }) {
  return (
    <div className="game">
      <div className="game-info">
        <span className="game-time"><label><T>timeElapsed</T></label> {timeElapsed}</span>
        <span className="game-attempts"><label><T>attemptsMade</T></label> {numAttempts}</span>
      </div>

      <div className="game-cards">
        {cards.map((card, index) => <Card card={card} key={index} index={index} />)}
      </div>

      <button onClick={onQuit}><T>quitGame</T></button>
    </div>
  );
}

GameView.propTypes = {
  timeElapsed: PropTypes.string.isRequired,
  numAttempts: PropTypes.number.isRequired,
  cards: PropTypes.array,
  onQuit: PropTypes.func.isRequired,
};
