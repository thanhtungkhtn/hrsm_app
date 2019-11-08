"use strict";

const BootBot = require("bootbot");

class Messenger extends BootBot {
  constructor(Config) {
    super({
      accessToken: Config.get("bootbot.accessToken"),
      verifyToken: Config.get("bootbot.verifyToken"),
      appSecret: Config.get("bootbot.appSecret")
    });

    this.start(Config.get("bootbot.port"));
  }
}

module.exports = Messenger;
