// NPM
import Slapp from 'slapp';
import ConvoStore from 'slapp-convo-beepboop';
import Context from 'slapp-context-beepboop';

const slapp = Slapp({
  convo_store: ConvoStore(),
  context: Context(),
});

export default slapp;
