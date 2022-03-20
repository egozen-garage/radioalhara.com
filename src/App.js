import { BrowserRouter, Route, Routes } from "react-router-dom";
// pages
import AllChannels from './pages/AllChannels';
import RadioChannel from './pages/RadioChannel';
// import About from './pages/About';

// styles
import './App.css';

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

      <BrowserRouter>
            {/* Header Area */}
            {/* <div className="max-w-full">
              <Header />
            </div> */}
            {/* Route Area */}
            <Routes>
              <Route element={<AllChannels/>} exact path="/" />
              <Route element={<RadioChannel/>} path="/:slug" />
              {/* <Route element={<About/>} path="/about" /> */}
            </Routes>
            {/* Footer Area */}
            {/* <div className="max-w-full">
              <Footer />
            </div> */}
        </BrowserRouter>
    </div>
  );
}

export default App;
