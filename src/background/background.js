const io = require('socket.io-client');

const socket = io(process.env.HOST);

socket.on('connect', () => {
  console.log('Connected, ' + new Date());
  browser.storage.local.get('token').then(res => {
    if(res.hasOwnProperty('token')) socket.emit('authenticate', res)
  });
});

socket.on('word', console.log)
  .on('authenticated', () => console.log('Authenticated!'))
  .on('unauthorized', msg => console.count(`Unauthorized: ${JSON.stringify(msg.data)}`))
  .on('disconnect', msg => console.log('Disconnected, ', new Date()))

browser.storage.onChanged.addListener( changedProps => {
  if(changedProps.hasOwnProperty('token')) socket.close().connect();
});
