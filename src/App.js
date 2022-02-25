// import logo from './logo.svg';
import './App.css';
import VideoBackground from './components/background/VideoBackground';
import Chat from './components/chat/Chat'
import Player from './components/player/Player';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          hi :) Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div id="head"></div>
      <VideoBackground/>
      <Player/>
      <Chat />

    </div>
  );
}

export default App;
