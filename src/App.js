import { BrowserRouter, Route, Routes } from "react-router-dom";
// pages
// import AllChannels from './pages/AllChannels';
import RadioChannel from './pages/RadioChannel';
import { MetaTags } from "react-meta-tags";
import ImageAssets from "./assets/img/logo192.svg"
// import About from './pages/About';

// styles
import './App.css';


function App() {
  return (
    <div className="App">
      <MetaTags>
        {/* <!-- HTML Meta Tags --> */}
        <title>Radio AlHara راديو الحارة</title>
        <meta
          name="description"
          content="Radio AlHara راديو الحارة Music Broadcast to the World."
        />

        {/* <!-- Google / Search Engine Tags --> */}
        <meta itemProp="name" content="Radio AlHara" />
        <meta
          itemProp="description"
          content="Radio AlHara راديو الحارة Music Broadcast to the World."
        />
        <meta
          itemProp="image"
          content= {ImageAssets}
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://www.radioalhara.net/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Radio AlHara راديو الحارة " />
        <meta
          property="og:description"
          content="Radio AlHara راديو الحارة Music Broadcast to the World."
        />
        <meta
          property="og:image"
          content= {ImageAssets}
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Radio AlHara راديو الحارة " />
        <meta
          name="twitter:description"
          content="Radio AlHara راديو الحارة Music Broadcast to the World."
        />
        <meta
          name="twitter:image"
          content= {ImageAssets}
        />
      </MetaTags>

      {/* <RadioChannel/> */}
      <BrowserRouter basename={'/palestine'}>
            <Routes >
              {/* <Route element={<AllChannels/>} exact path="/" /> */}
              <Route element={<RadioChannel/>} path="/" />
              {/* <Route element={<RadioChannel/>} path="/:slug" />
              <Route element={<About/>} path="/about" /> */}
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
