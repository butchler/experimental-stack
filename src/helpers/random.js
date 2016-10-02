export function getRandomCards(numItems, goalItems) {
  // TODO

  getRandomItems(numItems) {
    assert(this.isLoaded, "Goal must be loaded before calling getRandomItems()");
    assert(Number.isInteger(numItems) && numItems > 0, 'numItems must be a positive integer');

    const randomItems = [];

    // Randomly swap the order of items in this.goalItems, appending to
    // randomItems as we go. This way, there won't be any duplication of
    // items unless numItems > this.goalItems.length.
    for (let i = 0; i < numItems; i++) {
      // In case numItems > this.goalItems.length.
      const swapIndex = i % this.goalItems.length;

      // Randomly swap the current item with another item after it in the list
      // (possibly swapping it with itself/keeping it in the same place).
      const randomIndex = swapIndex + Math.floor(Math.random() * (this.goalItems.length - swapIndex));
      [this.goalItems[i], this.goalItems[randomIndex]] = [this.goalItems[randomIndex], this.goalItems[i]];

      // Add the current item to the result list.
      randomItems.push(this.goalItems[swapIndex]);
    }

    return randomItems;
  }

    initCards() {
        this.cards = [];

        // Create a cue card and a response card for each item.
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            this.cards.push(new CardStore(item, "cue", this));
            this.cards.push(new CardStore(item, "response", this));
        }

        // Shuffle the cards so that the cue card isn't right next to the response card.
        for (let i = 0; i < this.cards.length; i++) {
            const randomIndex = i + Math.floor(Math.random() * (this.cards.length - i));
            [this.cards[i], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[i]];
        }
    }
}
