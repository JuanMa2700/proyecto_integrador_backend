'use strict'

class SocketController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage (message) {
    this.socket.broadcastToAll('message', message)
    console.log('Llega mensaje ---> ' + message)
  }
}

module.exports = SocketController
