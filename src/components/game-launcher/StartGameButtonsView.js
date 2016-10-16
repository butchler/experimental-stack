import React, { PropTypes } from 'react';
import T from 'components/T';

export default function StartGameButtonsView({ startEasy, startMedium, startHard }) {
  return (
    <div>
      <button key="startEasy" className="button start-game-button" onClick={startEasy}><T>startEasy</T></button>
      <button key="startMedium" className="button start-game-button" onClick={startMedium}><T>startMedium</T></button>
      <button key="startHard" className="button start-game-button" onClick={startHard}><T>startHard</T></button>
    </div>
  );
}

StartGameButtonsView.propTypes = {
  startEasy: PropTypes.func.isRequired,
  startMedium: PropTypes.func.isRequired,
  startHard: PropTypes.func.isRequired,
};
