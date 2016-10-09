import { observable, computed, action } from 'mobx';
import { updateGameTimer } from 'constants/actions';

export default class TimerStore {
  @observable millisecondsElapsed = 0;

  @computed get seconds() {
    return Math.floor(this.millisecondsElapsed / 1000);
  }

  // Formats the game.millisecondsElapsed as a "minutes:seconds" string.
  @computed get string() {
    const secondsElapsed = this.seconds;
    const minutes = Math.floor(secondsElapsed / 60);
    const seconds = secondsElapsed % 60;

    return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
  }

  @action dispatch({ type, payload }) {
    if (type === updateGameTimer.type) {
      this.millisecondsElapsed = payload;
    }
  }
}
