export default function getRandomCards(numItems, goalItems) {
  if (!(Number.isInteger(numItems) && numItems > 0)) {
    throw new TypeError('numItems must be a positive integer');
  }

  const items = getRandomItems(numItems, goalItems);
  const cards = [];

  // Create a cue card and a response card for each item.
  for (let i = 0; i < items.length; i += 1) {
    cards.push({ itemIndex: i, side: 'cue' });
    cards.push({ itemIndex: i, side: 'response' });
  }

  // Shuffle the cards so that the cue card isn't right next to the response card.
  for (let i = 0; i < cards.length; i += 1) {
    const randomIndex = i + Math.floor(Math.random() * (cards.length - i));
    [cards[i], cards[randomIndex]] = [cards[randomIndex], cards[i]];
  }

  return { items, cards };
}

function getRandomItems(numItems, goalItems) {
  // Make a copy of the items so we can randomize the order.
  const items = [...goalItems];

  // Randomly swap the order of items in items, appending to
  // randomItems as we go. This way, there won't be any duplication of
  // items unless numItems > items.length.
  const randomItems = [];

  for (let i = 0; i < numItems; i += 1) {
    // In case numItems > items.length.
    const swapIndex = i % items.length;

    // Randomly swap the current item with another item after it in the list
    // (possibly swapping it with itself/keeping it in the same place).
    const randomIndex = swapIndex + Math.floor(Math.random() * (items.length - swapIndex));
    [items[swapIndex], items[randomIndex]] = [items[randomIndex], items[swapIndex]];

    // Add the current item to the result list.
    randomItems.push(items[swapIndex]);
  }

  return randomItems;
}
