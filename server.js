// NPM
const express = require('express');
const Slapp = require('slapp');
const ConvoStore = require('slapp-convo-beepboop');
const Context = require('slapp-context-beepboop');

const port = process.env.PORT || 7331;

const slapp = Slapp({
  convo_store: ConvoStore(),
  context: Context()
});

slapp.message('help', ['mention', 'direct_message'], (msg) => {
  msg.say('HELLO WORLD');
});

// Attach Slapp to express server
const server = slapp.attachToExpress(express());

// Start http server
server.listen(port, (err) => {
  if (err) return console.error(err);
  console.log(`Navi Bot running on port ${port}`);
});
