<template>
  <div class="chat">
    <div class="chat__wrapper" v-if="user.name">
      <div class="chat__conversation">
        <chat-conversation :socket="socket">
        </chat-conversation>
        <div class="chat__controls">
          <input @keyup="onKeyUp" class="chat__input" v-model="message" />
          <button class="chat__button" @click="sendMessage">Send</button>
        </div>
      </div>
      <div class="chat__participants">
        <chat-user-list :socket="socket"></chat-user-list>
      </div>
    </div>
    <div class="chat__error" v-else>
      Error, reload page and provide valid username!
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import ChatConversation from '../components/ChatConversation';
import ChatUserList from '../components/ChatUserList';

export default {
  name: 'app',
  components: {
    ChatConversation,
    ChatUserList
  },
  data() {
    return {
      message: '',
      socket: null,
      user: {
        name: null
      }
    };
  },
  created() {
    this.user.name = prompt('Please enter your username:', '');
    if (this.user.name) {
      this.socket = io('http://localhost:3333', {
        transports: [ 'websocket' ],
        path: 'adonis-ws'
      });

      this.socket.on('connect', () => {
        this.connect();
      });
    }
  },
  methods: {
    connect() {
      this.socket.emit('message', this.user);
    },
    sendMessage() {
      this.socket.emit('message', {
        user: this.user,
        message: this.message
      });
      this.message = '';
    },
    onKeyUp(event) {
      if (event.keyCode === 13) {
        this.sendMessage();
      }
    }
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.emit('disconnected', {
        user: this.user
      });
    }
  },
}
</script>

<style lang="scss">
html {
  box-sizing: border-box;
  font-size: 16px;
}
*, *:before, *:after {
  box-sizing: inherit;
}
html, body {
  height: 100%;
}
body, h1, h2, h3, h4, h5, h6, p, ol, ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
}
.chat {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 20px;
  &__wrapper {
    display: flex;
    flex-direction: row;
    flex: 1;
    border: 1px solid #ccc;
  }
  &__conversation {
    flex: 4;
    display: flex;
    flex-direction: column;
    height: 500px;
  }
  &__participants {
    flex: 1;
    height: 500px;
    border-left: 1px solid #ccc;
  }
  &__controls {
    height: 30px;
    display: flex;
    margin-top: auto;
  }
  &__input {
    height: 30px;
    padding: 0 10px;
    flex: 12;
    border: none;
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;
    outline: none;
  }
  &__button {
    height: 30px;
    flex: 1;
    border: 0;
    background: white;
    border-top: 1px solid #ccc
  }
  &__error {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
