const API_URL = import.meta.env.VITE_API_URL
const USE_HTTPS = JSON.parse(import.meta.env.VITE_USE_HTTPS)

export let socket;

export async function send(route, body = {}, http = false) {
  try {
    if (http === true) {
      const response = await fetch(`http${USE_HTTPS ? 's' : ''}://${API_URL}${route}`, {
        method: 'POST',
        body: JSON.stringify({ body, secret: localStorage.secret }),
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
      socket.send(JSON.stringify({ route, body, secret: localStorage.secret }))
    }
  } catch (error) {
    console.error(error)
  }
}

function connect() {
  return new Promise(function(resolve, reject) {
      var server = new WebSocket(`ws${USE_HTTPS ? 's' : ''}://${API_URL}/ws`);
      server.onopen = function() {
          resolve(server);
      };
      server.onerror = function(err) {
          reject(err);
      };

  });
}

