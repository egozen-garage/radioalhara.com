import { BrowserRouter, Route, Routes } from "react-router-dom";
// pages
import AllChannels from './pages/AllChannels';
import RadioChannel from './pages/RadioChannel';
// import About from './pages/About';

// styles
import './App.css';

function App() {

  // // Sanity API Connection
  // const sanityClient = require('@sanity/client')
  // const client = sanityClient({
  //   projectId: 'u3ckmo0l',
  //   dataset: 'production',
  //   apiVersion: '2021-10-21', // use current UTC date - see "specifying API version"!
  //   token: 'skJuYUYbIsMxkMWoeUwphKR7aVVfwCCN81SnjmKxl4sxYhOjNn6JyVw99TKcYqBsxD59trHQu2nQfZCNUWbPemg802VGScwJo1vBeIg0gfHGi378lojExYgiC1KoeKFS2AF5Q1nUs2DcWpcG11B9mFOB3vTXBa0rgcYEjAKmT5eBTMsnOGzt', // or leave blank for unauthenticated usage
  //   useCdn: true, // `false` if you want to ensure fresh data
  // })
  // // Performing queries
  // const query = '*[_type == "radioChannel"] {slug, title, backgroundMedium}'
  // client.fetch(query).then((radioChannels) => {
  //   console.log('Bikes with more than one seat:')
  //   radioChannels.forEach((radioChannel) => {
  //     console.log(`${radioChannel.title}`)
  //     console.log(`${radioChannel.slug.current}`)
  //     console.log(`${radioChannel.backgroundMedium}`)
  //   })
  // })  

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

      {/* <AllChannels/> */}
      {/* <RadioChannel/> */}
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
