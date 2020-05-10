const io = require('socket.io-client');

const socket = io(process.env.HOST);

socket.on('connect', () => {
  console.log('Connected, ' + new Date());
  browser.storage.local.get('token').then(res => {
    if(res.hasOwnProperty('token')) socket.emit('authenticate', res)
  });
});

socket.on('word', word => getActiveTab().then(res => res.length && sendMsgToTab(res[0].id)(word)))
  .on('authenticated', () => console.log('Authenticated!'))
  .on('unauthorized', msg => console.count(`Unauthorized: ${JSON.stringify(msg.data)}`))
  .on('disconnect', msg => console.log('Disconnected, ', new Date()))

browser.storage.onChanged.addListener( changedProps => {
  if(changedProps.hasOwnProperty('token')) socket.close().connect();
});

const sendMsgToTab = tabId => msg => browser.tabs.sendMessage( tabId, msg);
const getActiveTab = () => browser.tabs.query({ currentWindow: true, active: true })
