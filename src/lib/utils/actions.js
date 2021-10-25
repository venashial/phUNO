import { focused, hand, discard } from '../../routes/game/_store.js'
import { send } from '$lib/utils/api.js'

let focusedValue;

focused.subscribe(value => {
  focusedValue = value;
});

let handValue;

hand.subscribe(value => {
  handValue = value;
});

let discardValue;

discard.subscribe(value => {
  discardValue = value;
});

export function choose(origin, cardIndex = '') {
  if (focusedValue.location === '' && origin === 'discard' && Object.keys(discardValue).length === 0) {
    return
  } else if (
    focusedValue.location === '' ||
    (origin === 'hand' && focusedValue.location === 'hand' && focusedValue.cardIndex !== cardIndex) || // Switch focus between cards in hand
    (focusedValue.location === 'hand' && focusedValue.cardIndex === '') // Move focus if set on hand and no card is selected
  ) {
    // Focus new card
    focused.set({ location: origin, cardIndex })
  } else if (origin === focusedValue.location) {
    // Card already in focus, unfocus it
    focused.set({ location: '', cardIndex: '' })
  } else {
    if (origin === 'discard' && focusedValue.location === 'hand' && Object.keys(discardValue).length > 0) {
      discardValue = {
        [focusedValue.cardIndex]: handValue[focusedValue.cardIndex],
        ...discardValue
      }
      delete handValue[focusedValue.cardIndex]
      discard.set(discardValue)
      hand.set(handValue)
    } else if (origin === 'hand' && focusedValue.location === 'discard') {
      handValue[Object.keys(discardValue)[0]] = discardValue[Object.keys(discardValue)[0]];
      delete discardValue[Object.keys(discardValue)[0]]
      hand.set(handValue)
      discard.set(discardValue)
    }
    // Send move request to server
    send('move', { source: focusedValue.location, destination: origin, cardIndex: focusedValue.cardIndex })
    focused.set({ location: '', cardIndex: '' })
  }
}