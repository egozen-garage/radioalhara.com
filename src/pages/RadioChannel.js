import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import sanityClient from "../client";

// components
import Background from '../components/background/VideoBackground';
import Chat from '../components/chat/Chat';
import Player from '../components/player/Player';



export default function RadioChannel() {
  const [channelTtems, setChannelItems] = useState(null);
  const { slug } = useParams();

  // Performing queries
  // const query = `*[slug.current match "${slug}"] {_id, title, slug, backgroundMedium, videoFile }`
  const query = `*[slug.current match "${slug}"]`
  useEffect(() => {
      sanityClient.fetch(query)
          .then((data) => setChannelItems(data))
          .catch(console.error);
  }, [query]);

  console.log("amout of array elements: ")

  



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
  // const query = '*[_type == "radioChannel"] {title}'
  // client.fetch(query).then((radioChannels) => {
  //   console.log('Bikes with more than one seat:')
  //   radioChannels.forEach((radioChannel) => {
  //     console.log(`${radioChannel.title}`)
  //   })
  // })  

  return (
    <div className="component-RadioChannel">
      <div id="head" style={{height: '100px'}}></div>
        {channelTtems && channelTtems.map(
            (channelItem) => (
              <Background channelItem={channelItem} key={channelItem.backgroundMedium + channelItem._id} />
            )
         )}
        {channelTtems && channelTtems.map(
            (channelItem) => (
              <div>
                called twice ? ? ? 
                <Player radioJarID={channelItem.radioJarID} key={channelItem.radioJarID + channelItem._id}/>               
              </div>
            )
         )}
        {channelTtems && channelTtems.map(
            (channelItem) => (
              <Chat telegramChatID={channelItem.telegramDiscussionLink} key={channelItem.telegramDiscussionLink + channelItem._id}/>
            )
         )}
    </div>
  );
}
// 78cxy6wkxtzuv
// export default RadioChannel;
