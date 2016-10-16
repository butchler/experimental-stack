import { observable, computed, action } from 'mobx';
import { updateGameTimer } from 'constants/actions';

export default class TimerStore {
  @observable millisecondsElapsed = 0;

  @computed get secondsElapsed() {
    return Math.floor(this.millisecondsElapsed / 1000);
  }

  // Formats the game.millisecondsElapsed as a "minutes:seconds" string.
  @computed get timeElapsedString() {
    const minutes = Math.floor(this.secondsElapsed / 60);
    const seconds = this.secondsElapsed % 60;
    const secondsString = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${secondsString}`;
  }

  @action dispatch({ type, payload }) {
    if (type === updateGameTimer.type) {
      this.millisecondsElapsed = payload;
    }
  }
}
