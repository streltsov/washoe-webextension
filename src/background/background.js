const io = require('socket.io-client');

const socket = io(process.env.HOST);
socket.on('connect', () => {
  console.log('Connected, ' + new Date());

  socket
    .on('authenticated', () => console.log('Authenticated!'))
    .on('unauthorized', msg => console.count(`Unauthorized: ${JSON.stringify(msg.data)}`))
    .on('disconnect', msg => console.log('Disconnected, ', new Date()));

  browser.storage.local.get('token').then(res => {
    const { token } = res;
    if(token) socket.emit('authenticate', { token })
  });
});

browser.storage.onChanged.addListener( changedProps => {
  const socket = io(process.env.HOST);
  socket.on('connect', () => {
    console.log('Connected on token change, ' + new Date());

    socket
      .on('authenticated', () => console.log('Authenticated!'))
      .on('unauthorized', msg => console.count(`Unauthorized: ${JSON.stringify(msg.data)}`))
      .on('disconnect', msg => console.log('Disconnected, ', new Date()));

    const { token: { newValue: token } } = changedProps;
    if(token) socket.emit('authenticate', { token });

  });
});
