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

const getUserData = ({ token, user }) => {
  return new Promise((resolve, reject) => {
    slapp.client.users.info({ token, user }, (err, userData) => {
      if (userData) { resolve(userData); }
      reject(err);
    });
  });
}

const logError = (error) => {
  console.log('error', error);
}

slapp.event('message', async (msg) => {
  // console.log('channel message', msg);

  const { meta, body } = msg;
  const token = meta.bot_token;
  const channel = body.event.channel;
  const timestamp = body.event.ts;

  // Get user data (only if there's any user data to be had)
  const user = body.event.user;
  if (!user) return;
  const userData = await getUserData({ token, user }).catch(logError);
  // console.log('userData called', userData);

  // If the name isn't who we want to bug, don't add a reaction
  const { name } = userData.user;
  if (name !== 'trevon') return;
  console.log(`Bugging ${name}`);

  // Add a reaction
  slapp.client.reactions.add({
    token,
    name: 'fastparrot',
    channel,
    timestamp
  }, (err) => {
    if (err) return console.log('error adding reaction');
  });
});

// Catch-all for any other direct message responses not handled above
slapp.message('.*', ['direct_mention', 'direct_message'], (msg) => {
  console.log('message', msg);
  msg.say(':fastparrot:');
});

// Attach Slapp to express server
const server = slapp.attachToExpress(express());

// Start http server
server.listen(port, (err) => {
  if (err) return console.error(err);
  console.log(`Navi Bot running on port ${port}`);
});
