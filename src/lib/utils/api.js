const API_URL = import.meta.env.VITE_API_URL
const USE_HTTPS = JSON.parse(import.meta.env.VITE_USE_HTTPS)
import { receive } from '$lib/utils/receiver.js'
import { overlay, code } from '../../routes/game/_store.js'

let codeValue = ''
code.subscribe(value => {
  codeValue = value;
});

export let socket;

export async function send(route = '', body = {}, http = false) {
  try {
    /*
    if (http === true) {
      const response = await fetch(`http${USE_HTTPS ? 's' : ''}://${API_URL}${route}`, {
        method: 'POST',
        body: JSON.stringify(body),
      })
      if (response.ok && response) {
        if (response.status === 204) {
          return {}
        } else {
          return response.json()
        }
      } else {
        throw new Error(response.statusText)
      }
    } else {
    */
    if (!socket || socket.readyState === 3) socket = await connect()

    socket.send(JSON.stringify({ route, body: { ...body, ...(codeValue !== '' ? { code: codeValue } : {}) } }))
  } catch (error) {
    console.error(error)
  }
}

function connect(tries = 0) {
  return new Promise(function (resolve, reject) {
    console.log('Connecting...')
    const server = new WebSocket(`ws${USE_HTTPS ? 's' : ''}://${API_URL}/ws`);

    const timer = setTimeout(() => {
      reject(new Error("WebSocket timeout"));
      clearTimeout(timer);
      server.close();
    }, 2000); // <- timeout

    server.onopen = () => {
      clearTimeout(timer);
      if (tries > 0) {
        console.log(`Reconnected after ${tries} tries`)
        overlay.set({
          show: false,
          closable: true,
          style: '',
          message: ''
        })
        send('register', {
          recovery: localStorage.getItem('recovery')
        });
      }
      resolve(server);
    };

    server.onerror = (err) => {
      console.log('Socket errored');
      reject(err);
    };

    server.onmessage = (event) => {
      receive(JSON.parse(event.data))
    };

    let closing = false;

    window.onbeforeunload = () => {
      closing = true;
    };

    server.onclose = () => {
      console.log('Socket closed!')
      overlay.set({
        show: true,
        closable: false,
        style: 'error',
        message: 'Womp womp. The server just went offline! You\'ll be reconnected as soon as possible' + '.'.repeat(tries)
      })
      if (!closing) setTimeout(() => connect(tries + 1).catch(() => console.log('Reconnect failed')), tries < 10 ? 2000 : 10000);
    };
  });
}