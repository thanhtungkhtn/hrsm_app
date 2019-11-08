<template>
  <div class="chat-conversation">
    <div
      class="chat-conversation__message"
      v-for="message in messages"
      :message="message"
      v-bind:key="message.id">
      <strong>{{ message.user.name }}: </strong>{{ message.message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatConversation',
  props: {
    socket: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      messages: []
    };
  },
  mounted() {
    this.socket.on('message', (data) => {
      this.messages.push(data);
    });
    this.socket.on('disconnect', () => {
      this.messages = [];
    });
  }
}
</script>

<style lang="scss">
.chat-conversation {
  padding: 10px 0;
  &__message {
    padding: 0 10px;
    text-align: left;
  }
}
</style>