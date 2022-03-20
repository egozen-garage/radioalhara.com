import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  // const query = `*[slug.current match "${slug}"]`
  const query = `*[ _type == "radioChannel" && slug.current match "${slug}" && !(_id in path("drafts.**"))]`

  useEffect(() => {
      sanityClient.fetch(query)
          .then((data) => setChannelItems(data))
          .catch(console.error);
  }, [query]); 

  return (
    <div className="component-RadioChannel">
        {channelTtems && channelTtems.map(
            (channelItem) => (
              <Background channelItem={channelItem} key={channelItem.backgroundMedium + channelItem._id} />
            )
         )}
        <div id="contentWrapper">
        {channelTtems && channelTtems.map(
            (channelItem) => (
                <Player radioJarID={channelItem.radioJarID} key={channelItem.radioJarID + channelItem._id}/>               
            )
         )}
        {channelTtems && channelTtems.map(
            (channelItem) => (
              <Chat telegramChatID={channelItem.telegramDiscussionLink} key={channelItem.telegramDiscussionLink + channelItem._id}/>
            )
         )}
         </div>
    </div>
  );
}
// export default RadioChannel;
