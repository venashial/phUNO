import { focused } from '../../routes/game/_store.js'
import { send } from '$lib/utils/api.js'

let focusedValue;

const _unsubscribe = focused.subscribe(value => {
  focusedValue = value;
});

export function choose(origin, cardIndex = '') {
  if (focusedValue.location === '' || (origin === 'hand' && focusedValue.location === 'hand' && focusedValue.cardIndex !== cardIndex) || (origin === 'discard' && focusedValue.location === 'draw') || (origin === 'draw' && focusedValue.location === 'discard') || (focusedValue.location === 'hand' && focusedValue.cardIndex === '')) {
    // focus new card
    focused.set({ location: origin, cardIndex })
  } else if (origin === focusedValue.location) {
    // card already focus, unfocus it
    focused.set({ location: '', cardIndex: '' })
  } else {
    // destination chosen
    send('move', { source: focusedValue.location, destination: origin, cardIndex: focusedValue.cardIndex })
    focused.set({ location: '', cardIndex: '' })
  }
}