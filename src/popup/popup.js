import { h, render } from 'preact';
import { useState } from 'preact/hooks';
import io from 'socket.io-client';

const getFormValues = event =>
  Array.from(event.target.elements)
    .filter(el => el.name)
    .reduce((acc, cur) => ({...acc, [cur.name]: cur.value}), {});

const SignUp = () => { 
  const handleSubmit = event => {
    event.preventDefault();
    const socket = io(process.env.HOST);
    socket
      .emit('signup', JSON.stringify( getFormValues(event) ))
      .on('token', token => browser.storage.local.set({token}));
  }
  return (
    <form onSubmit={handleSubmit} >
      <label for="email">Email:</label><br />
      <input type="email" id="email" name="email" /><br />
      <label for="password">Password:</label><br />
      <input type="password" id="password" name="password" /><br /><br />
      <button>Sign Up!</button>
    </form>
  )
};

const Login = () => { 
  const handleSubmit = event => {
    event.preventDefault();
    const socket = io(process.env.HOST);
    socket
      .on('connect', () => socket.emit('login', JSON.stringify( getFormValues(event) )))
      .on('token', token => browser.storage.local.set({token}));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label for="email">Email:</label><br />
      <input required type="email" id="email" name="email" /><br />
      <label for="password">Password:</label><br />
      <input required type="password" id="password" name="password" /><br /><br />
      <button>Login!</button>
    </form>
  )
};

const AddWord = () => {
  const handleSubmit = event => {
    event.preventDefault();
    socket.emit('add word', JSON.stringify( getFormValues(event) ))
  }
  return (
    <form onSubmit={handleSubmit}>
      <label for="word">Word:</label><br />
      <input required type="text" id="word" name="word" /><br />
      <label for="meaning">Meaning:</label><br />
      <input required type="meaning" id="meaning" name="meaning" /><br /><br />
      <label for="example">Example:</label><br />
      <input required type="example" id="example" name="example" /><br /><br />
      <button>Add!</button>
    </form>
  )
}

const App = () => {
  const [state, setState] = useState('AddWord');

  return (
    <div>
      <button onClick={() => setState('signup')}>Sign Up</button>
      <button onClick={() => setState('login')}>Login</button>
      <button onClick={() => setState('add word')}>Add Word</button>
      {state == 'login' ? <Login /> : state == 'signup' ? <SignUp /> : <AddWord />}
    </div>
  );

}


render(<App />, document.body.querySelector('#root'));
