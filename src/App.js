import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthButton from './componentes/AuthButton';
import LoggedIn from './componentes/LoggedIn';
import Value from './componentes/Value';


function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <p><AuthButton popup="popup.html"/></p>
        <LoggedIn>
          <p>Welcome back, <Value src="user.name"/>.</p>
        </LoggedIn>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React. Developed using Docker.
        </a>
      </header>
    </div>
  );
}



export default App;
