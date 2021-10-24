import * as store from '../../routes/game/_store.js';
import { goto } from '$app/navigation'

export function receive(data) {
  if (data.error) {
    store.overlay.set({
      style: 'warning',
      closable: true,
      message: data.error,
      show: true,
    })
  } else if (data.type === 'update') {
    store[data.store].set(data.data)
  } else if (data.type === 'redirect') {
    goto(data.url + (data.message ? '?message=' + encodeURIComponent(data.message) : ''))
  }
}