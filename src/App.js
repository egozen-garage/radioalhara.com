import { BrowserRouter, Route, Routes } from "react-router-dom";
// pages
import AllChannels from './pages/AllChannels';
import RadioChannel from './pages/RadioChannel';
import { MetaTags } from "react-meta-tags";
import ImageAssets from "./assets/img/logo192.svg";
// import About from './pages/About';

// styles
import './App.css';


function App() {
  return (
    <div className="App">
      <MetaTags>
        {/* <!-- HTML Meta Tags --> */}
        <title>Radio alHara</title>
        <meta
          name="description"
          content="///// Hello World /////"
        />

        {/* <!-- Google / Search Engine Tags --> */}
        <meta itemprop="name" content="Radio alHara" />
        <meta
          itemprop="description"
          content="Radio alHara. 24/7 Online Music Broadcast to the World."
        />
        <meta
          itemprop="image"
          content= {ImageAssets}
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://www.radioalhara.net/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Radio alHara" />
        <meta
          property="og:description"
          content="Radio alHara. 24/7 Online Music Broadcast to the World."
        />
        <meta
          property="og:image"
          content= {ImageAssets}
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Radio alHara" />
        <meta
          name="twitter:description"
          content="Radio alHara. 24/7 Online Music Broadcast to the World."
        />
        <meta
          name="twitter:image"
          content= {ImageAssets}
        />
      </MetaTags>

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
