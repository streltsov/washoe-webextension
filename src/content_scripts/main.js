import { INTERVALS } from '../data';
import './Notification.css';

browser.runtime.onMessage.addListener(request => {

  if(!document.body.querySelector('#washoe-notification')) {
    return new Promise(resolve => {

        const word = JSON.parse(request);

      console.log(word);
      console.log('INTERVALS: ', INTERVALS[word.stage + 1]);
      console.log('timestamp: ', new Date( Date.now() + INTERVALS[word.stage + 1]));

        /* Notification */
        const notification = document.createElement('div');
        notification.id = 'washoe-notification';
        notification.className = 'opening'
        notification.textContent = word.meaning;

        /* Input */
        const input = document.createElement('input');
        input.addEventListener('input', event => {
          if(word.word == event.target.value) {
            notification.className = 'closing';
            setTimeout(() => notification.remove(), 2000);
            console.log({ type: 'stageup', ...word, timestamp: new Date( Date.now() + INTERVALS[word.stage + 1]) });
            resolve({ type: 'stageup', ...word, timestamp: new Date( Date.now() + INTERVALS[word.stage + 1]) });
          }
        });
      notification.appendChild(input);
      setTimeout(() => input.focus());

      /* Button */
      const button = document.createElement('button');
      button.textContent = '❌';
      button.addEventListener('click', () => {
        notification.className = 'closing';
        setTimeout(() => notification.remove(), 2000);
        resolve({ type: 'reset', ...word, timestamp: new Date( Date.now() + INTERVALS[0]) });
      });

      notification.appendChild(button);
      document.body.appendChild(notification);
    });
  }
});

