import { writable } from 'svelte/store';

export const isHost = writable(false);

export const code = writable('');

export const recovery = writable(localStorage.getItem('recovery') || '');

recovery.subscribe(secret => {
  localStorage.setItem('recovery', secret);
});

export const nickname = writable('')

export const hand = writable([{
    id: 'red-2-1',
    color: 'red',
    symbol: '2'
  },
  {
    id: 'green-9-1',
    color: 'green',
    symbol: '9'
  },
  {
    id: 'blue-2-1',
    color: 'blue',
    symbol: '2'
  },]);

export const players = writable([]);

export const discard = writable([{
  color: 'red',
  symbol: '2'
},
{
  color: 'green',
  symbol: '9'
},
{
  color: 'blue',
  symbol: '2'
},]);

export const focused = writable({
  location: '',
  cardIndex: '',
});

export const state = writable('profile');

export const overlay = writable({
  show: false,
  style: '',
  message: '',
});