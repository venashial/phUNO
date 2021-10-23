import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const isHost = writable(false);

export const code = writable('');

let existingRecovery = ''

if (browser) existingRecovery = localStorage.getItem('recovery') || ''

export const recovery = writable(existingRecovery);

recovery.subscribe(secret => {
  if (browser) localStorage.setItem('recovery', secret);
});

export const nickname = writable('')

export const hand = writable({});

export const players = writable([]);

export const discard = writable({});

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