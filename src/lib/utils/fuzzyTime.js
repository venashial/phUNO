export default function (now, time) {
  const date = new Date(time);

  const delta = Math.round((now - +date) / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;

  let fuzzy;

  if (delta < 2) {
    fuzzy = 'just now';
  } else if (delta < minute) {
    fuzzy = delta + ' seconds ago';
  } else if (delta < 2 * minute) {
    fuzzy = 'a minute ago'
  } else if (delta < hour) {
    fuzzy = Math.floor(delta / minute) + ' minutes ago';
  } else if (Math.floor(delta / hour) == 1) {
    fuzzy = '1 hour ago'
  } else if (delta < day) {
    fuzzy = Math.floor(delta / hour) + ' hours ago';
  } else if (delta < day * 2) {
    fuzzy = 'yesterday';
  }

  return fuzzy;
}