// import logo from './logo.svg';
import './App.css';
import Background from './components/background/VideoBackground';
import Chat from './components/chat/Chat'
import Player from './components/player/Player';
import chatScript from './components/scripts/LoadTelegramScript';

function App() {

  
  return (
    <div className="App">

      <Background medium="video"/>
      <Player radioJarID="78cxy6wkxtzuv"/>
      <Chat telegramChatID="54"/>

    </div>
  );
}

export default App;
