const io = require('socket.io-client');

import { createStore, combineReducers } from 'redux';
import { wrapStore } from 'webext-redux';

const isLoggedIn = (state = false, action) =>
  action.type == 'IS_LOGGED_IN' ? action.payload : state;

const rootReducer = combineReducers({isLoggedIn});

const store = createStore(rootReducer);

wrapStore(store);

const socket = io(process.env.HOST);

socket.on('connect', () => {
  console.log('Connected, ' + new Date());
  browser.storage.local.get('token').then(res => {
    if(res.hasOwnProperty('token')) socket.emit('authenticate', res)
  });
});

socket.on('word', word => {
  const onRespond = res => {
    res && socket.emit('notification-response', JSON.stringify(res));
  }
  getActiveTab()
    .then(res => res.length && sendMsgToTab(res[0].id)(word).then(onRespond));
})
  .on('authenticated', () => {
    console.log('Authenticated!');
    store.dispatch({type: 'IS_LOGGED_IN', payload: true});
  })
  .on('unauthorized', msg => {
    console.count(`Unauthorized: ${JSON.stringify(msg.data)}`);
    store.dispatch({type: 'IS_LOGGED_IN', payload: false});
  })
  .on('disconnect', msg => {
    console.log('Disconnected, ', new Date());
    store.dispatch({type: 'IS_LOGGED_IN', payload: false});
  })

browser.storage.onChanged.addListener( changedProps => {
  console.log('Token changed');
  if(changedProps.hasOwnProperty('token')) socket.close().connect();
});

// Add Word
browser.runtime.onMessage.addListener(res => {
  console.log('Word to add: ', { ...res.word, notifyIn: 12e4 });
  socket.emit('add word', JSON.stringify({ ...res.word, notifyIn: 12e4 }));
});

const sendMsgToTab = tabId => msg => browser.tabs.sendMessage( tabId, msg);
const getActiveTab = () => browser.tabs.query({ currentWindow: true, active: true })
