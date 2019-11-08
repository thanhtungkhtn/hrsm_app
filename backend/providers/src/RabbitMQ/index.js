"use strict";

const Tortoise = require("tortoise");

class RabbitMQ extends Tortoise {
  constructor(Config, Event) {
    super(
      // prettier-ignore
      `amqp://${Config.get("amqp.username")}:${Config.get("amqp.password")}@${Config.get("amqp.host")}:${Config.get("amqp.port")}`,
      {
        connectRetries: -1,
        connectRetryInterval: 1000
      }
    );

    this.Config = Config;
    this.Event = Event;

    this._bindEvents();
  }

  _bindEvents() {
    this.on(Tortoise.EVENTS.CONNECTIONERROR, err => {
      this.Event.fire("AMQP:Error", err);
    });

    this.on(Tortoise.EVENTS.CONNECTIONDISCONNECTED, err => {
      this.Event.fire("AMQP:Disconnected", err);
    });

    this.on(Tortoise.EVENTS.CONNECTIONCLOSED, err => {
      this.Event.fire("AMQP:Closed", err);
    });
  }
}

module.exports = RabbitMQ;
