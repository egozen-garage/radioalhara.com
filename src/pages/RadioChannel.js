import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client";

// components
import Background from '../components/background/VideoBackground';
import Chat from '../components/chat/Chat';
import Player from '../components/player/Player';
import ProgramContainer from '../components/ProgramContainer';



export default function RadioChannel() {
  const [channelTtems, setChannelItems] = useState(null);
  const { slug } = useParams();

  // Performing queries
  // Backup for slug routing:
  // const query = `*[ _type == "radioChannel" && slug.current match "${slug}" && !(_id in path("drafts.**"))]`
  const query = `*[ _type == "radioChannel" && slug.current match "palestine" && !(_id in path("drafts.**"))]`

  useEffect(() => {
      sanityClient.fetch(query)
          .then((data) => setChannelItems(data))
          .catch(console.error);
  }, [query]); 

  return (
    <div className="component-RadioChannel">
        {channelTtems && channelTtems.map(
            (channelItem) => (
              <Background 
                channelItem={channelItem} 
                key={"backgroundContainer" + channelItem._id} 
              />
            )
        )}
        <div id="contentWrapper">
          <div id="playerWrapper">
          {channelTtems && channelTtems.map(
              (channelItem) => (
                <Player 
                  radioJarID={channelItem.radioJarID} 
                  key={"playerContainer" + channelItem._id}
                />               
              )
          )}
          {/* {channelTtems && channelTtems.map(
              (channelItem) => (
                <ProgramContainer
                  channelItem={channelItem}
                  key={"programmContainer" + channelItem._id}
                />
              )
          )} */}
          </div>
          {channelTtems && channelTtems.map(
              (channelItem) => (
                <Chat 
                  telegramChatID={channelItem.telegramDiscussionLink} 
                  key={"chatContainer" + channelItem._id}
                />
              )
          )}
        </div>
    </div>
  );
}
// export default RadioChannel;
