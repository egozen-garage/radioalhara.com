import React, { useState, useEffect } from "react";
import { unmountComponentAtNode } from "react-dom";

import sanityClient from "../client";
// import RadioChannel from "./RadioChannel";
import PreviewChannel from "../components/PreviewChannel";

const AllChannels = () => {
  const [channels, setChannels] = useState(null);

  // Performing queries
  const query = '*[_type == "radioChannel"] {_id, title, slug, backgroundMedium}'

  useEffect(() => {
    sanityClient.fetch(query)
        .then((data) => setChannels(data))
        .catch(console.error);
  }, []);

  

  return (
      <div className="">
          <h3 className="">
              All Channels: 
          </h3>

          <ul className="PreviewChannel">
              {channels && channels.map(
                (channel) => (
                  <PreviewChannel 
                    key={channel.title + channel._id}
                    title={channel.title} 
                    slug={channel.slug.current} 
                    backgroundMedium={channel.backgroundMedium}
                  />
                )
              )}
          </ul>
      </div>
  );
}



// function AllChannels() {

//   // Sanity API Connection
//   const sanityClient = require('@sanity/client')
//   const client = sanityClient({
//     projectId: 'u3ckmo0l',
//     dataset: 'production',
//     apiVersion: '2021-10-21', // use current UTC date - see "specifying API version"!
//     token: 'skJuYUYbIsMxkMWoeUwphKR7aVVfwCCN81SnjmKxl4sxYhOjNn6JyVw99TKcYqBsxD59trHQu2nQfZCNUWbPemg802VGScwJo1vBeIg0gfHGi378lojExYgiC1KoeKFS2AF5Q1nUs2DcWpcG11B9mFOB3vTXBa0rgcYEjAKmT5eBTMsnOGzt', // or leave blank for unauthenticated usage
//     useCdn: true, // `false` if you want to ensure fresh data
//   })
//   // Performing queries
//   const query = '*[_type == "radioChannel"] {slug, title, backgroundMedium}'
//   client.fetch(query).then((radioChannels) => {
//     console.log('Bikes with more than one seat:')
//     radioChannels.forEach((radioChannel) => {
//         PreviewRadioChannel(radioChannel);
//         console.log(`${radioChannel.title}`)
//         console.log(`${radioChannel.slug.current}`)
//         console.log(`${radioChannel.backgroundMedium}`)
//     })
//   })  

//   return (
//     <div></div>
//   );
// }

// const PreviewRadioChannel = (props) => {
//     return (
//         <div>
//             {props.title}
//         </div>
//     )
// }

export default AllChannels;
