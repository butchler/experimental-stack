import { observable } from 'mobx';

export default class ItemStore {
  @observable cue;
  @observable response;
  // Whether or not the player has found the two matching cards for this item.
  @observable matched = false;

  constructor(cue, response) {
    this.cue = cue;
    this.response = response;
  }
}
