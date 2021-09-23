import { writable } from 'svelte/store';

export const isHost = writable(false);

export const code = writable('');

export const secret = writable('');

secret.subscribe(secret => {
  localStorage.setItem('secret', secret);
});

export const self = writable({
  nickname: '',
  hand: [{
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
  },],
});

export const players = writable([
  {
    nickname: 'Mr. Crawford',
    count: 90
  },
  {
    nickname: 'Ms. Orret',
    count: 2
  }
]);

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