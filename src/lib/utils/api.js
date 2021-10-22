const API_URL = import.meta.env.VITE_API_URL
const USE_HTTPS = JSON.parse(import.meta.env.VITE_USE_HTTPS)
import { receive } from '$lib/utils/receiver.js'
import { overlay, code } from '../../routes/game/_store.js'

let codeValue = ''

code.subscribe(value => {
  codeValue = value;
});

export let socket;

export async function send(route, body = {}, http = false) {
  try {
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
      if (!socket) socket = await connect()
      socket.addEventListener('message', (event) => {
        receive(JSON.parse(event.data))
      });
      if (!socket) {
        console.log('Can\'t connect to the server :(')
      }
      socket.send(JSON.stringify({ route, body: {...body, ...(codeValue !== '' ? { code: codeValue} : {}) } }))
    }
  } catch (error) {
    console.error(error)
    overlay.set({
      show: true,
      style: 'error',
      message: 'Womp womp. The server that holds all the rooms isn\'t available, so you won\'t be able to play. Try again in a bit.'
    })
  }
}

function connect() {
  return new Promise(function (resolve, reject) {
    var server = new WebSocket(`ws${USE_HTTPS ? 's' : ''}://${API_URL}/ws`);
    server.onopen = function () {
      resolve(server);
    };
    server.onerror = function (err) {
      reject(err);
    };
  });
}