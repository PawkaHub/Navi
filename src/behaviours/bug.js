// Slapp
import slapp from 'config/slapp';

// Helpers
import { getUserData, logError } from 'helpers';

export default slapp.event('message', async (msg) => {
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
  if (name !== 'pawka') return;
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
