const styles = `
#snackbar {
  min-width: 250px;
  margin-left: -125px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  right: 16px;
  bottom: 16px;
  font-size: 16px;
}

.opening {
  animation: fadein 0.5s;
}

.closing {
  animation: fadeout 0.5s forwards;
}

@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;} 
  to {bottom: 16px; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 16px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 30px; opacity: 1;} 
  to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}`;

browser.runtime.onMessage.addListener(request => {

  if(!document.body.querySelector('#snackbar')) {
    const toast = document.createElement('div');
    toast.id = 'snackbar';
    toast.className = 'opening'
    toast.textContent = JSON.parse(request).meaning;

    /* Input */
    const input = document.createElement('input');
    input.addEventListener('input', event => {
      if(JSON.parse(request).word == event.target.value) {
        document.body.querySelector('#snackbar').className = 'closing';
        setTimeout(() => document.body.querySelector('#snackbar').remove(), 2000);
      }
    });
    toast.appendChild(input);
    setTimeout(() => input.focus());

    /* Button */
    const button = document.createElement('button');
    button.textContent = '❌';
    button.addEventListener('click', () => {
      console.log('clicked');
      document.body.querySelector('#snackbar').className = 'closing';
      setTimeout(() => document.body.querySelector('#snackbar').remove(), 2000);
    });
    toast.appendChild(button);

    const style = document.createElement('style');
    style.textContent = styles;
    document.body.appendChild(style);
    document.body.appendChild(toast);
  }

  //  return Promise.resolve({response: "Hi from content script"});
});

