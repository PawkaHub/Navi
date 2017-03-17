// NPM
import express from 'express';

// Slapp
import slapp from 'config/slapp';

// Behaviours
import hello from 'behaviours/hello';
import bug from 'behaviours/bug';

// Attach Slapp to express server
const server = slapp.attachToExpress(express());

// Start http server
const port = process.env.PORT || 7331;

// Start Server
server.listen(port, (err) => {
  if (err) return console.error(err);
  console.log(`Navi Bot running on port ${port}`);
});
