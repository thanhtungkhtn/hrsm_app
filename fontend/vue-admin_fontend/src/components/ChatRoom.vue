<template>
  <div id="app">
    <h1>Chat Room</h1>
    <input type="text" v-model="inputMessage"/>
    <button @click="sendMessage(inputMessage)" >Send</button>
    <br><hr>
    <ul>
      <li v-bind:key="m" v-for="m in message">
        {{m}}
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import 'babel-polyfill'
import Ws from '@adonisjs/websocket-client'

export default {
  name: 'App',
  components: {

  },
  data: () => ({
    socket_client: null,
    chat: null,
    inputMessage: 'Hello',
    message: [
      'Welcome to my ChatRoom',
      'Nice to meet you'
    ]
  }),
  async created () {
    this.initializeWs()
  },
  methods: {
    initializeWs: async function () {

      Vue.prototype.$socket_client = Ws('ws://localhost:3333').connect().subscribe('chat')

      this.$socket_client.on('ready', () => {

        console.log('Pham Thanh Tung')
        // this.sendMessage('Pham Thanh Tung')
      })

      this.$socket_client.on('message', (data) => {

        this.receiveMessage(data)
        console.log(data)
      })
    },
    sendMessage: async function (message) {
      // alert(this.inputMessage)
      this.$socket_client.emit('message', message)
    },
    receiveMessage: async function (msg) {

      this.message.push(msg)
    }
  }
}
</script>

<style>

</style>
