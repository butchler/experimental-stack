import { startGame, updateGameTimer } from 'constants/actions';

const INITIAL_STATE = {
  millisecondsElapsed: 0,
  secondsElapsed: 0,
  timeElapsedString: '0:00',
};

export default function reduceGameTimer(state = INITIAL_STATE, { type, payload }) {
  if (type === startGame.type) {
    return INITIAL_STATE;
  } else if (type === updateGameTimer.type) {
    // Store the milliseconds elapsed instead of just seconds so the timer is more accurate.
    const millisecondsElapsed = state.millisecondsElapsed + payload;
    const secondsElapsed = Math.floor(millisecondsElapsed / 1000);

    return {
      millisecondsElapsed,
      secondsElapsed,
      timeElapsedString: (
        // Don't re-format the string if the number of seconds hasn't changed yet.
        secondsElapsed !== state.secondsElapsed ?
          formatMinutes(secondsElapsed) :
          state.timeElapsedString
      ),
    };
  }

  return state;
}

function formatMinutes(secondsElapsed) {
  // Formats the game.millisecondsElapsed as a "minutes:seconds" string.
  const minutes = Math.floor(secondsElapsed / 60);
  const seconds = secondsElapsed % 60;
  const secondsString = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${secondsString}`;
}
