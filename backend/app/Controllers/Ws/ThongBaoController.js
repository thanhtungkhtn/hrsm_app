'use strict'

class ThongBaoController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage (message) {
    this.socket.broadcastToAll('message', message)

    this.socket.on('message', (data) =>{
      console.log(this.socket.id)
      console.log(this.socket.topic)
      console.log(data)
    })

    // console.log(this.socket.id)
  }

  onClose () {
    // same as: socket.on('close')
  }

  onError () {
    // same as: socket.on('error')
    this.socket.on('error', (data) =>{

      console.log(data)
    })
  }
}

module.exports = ThongBaoController
