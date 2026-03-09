import React, { useState, useEffect, useRef } from "react";
import sanityClient from "../client";
import Background from '../components/background/VideoBackground';
import Chat from '../components/chat/Chat';
import Player from '../components/player/Player';

export default function RadioChannel() {
  const [channelTtems, setChannelItems] = useState(null);
  const playerRef = useRef(null);

  const query = `*[ _type == "radioChannel" && slug.current match "palestine" && !(_id in path("drafts.**"))]`;

  useEffect(() => {
    sanityClient.fetch(query)
      .then((data) => setChannelItems(data))
      .catch(console.error);
  }, [query]);

  // Measure player height and set CSS variable so chat can position itself
  useEffect(() => {
    const updatePlayerHeight = () => {
      const playerEl = document.getElementById('rh-player-root');
      if (playerEl) {
        const h = playerEl.offsetHeight;
        document.documentElement.style.setProperty('--player-height', `${h}px`);
      }
    };
    updatePlayerHeight();
    window.addEventListener('resize', updatePlayerHeight);
    // Also check after short delay for when content loads
    const t = setTimeout(updatePlayerHeight, 500);
    return () => {
      window.removeEventListener('resize', updatePlayerHeight);
      clearTimeout(t);
    };
  }, [channelTtems]);

  return (
    <div className="component-RadioChannel">
      {channelTtems && channelTtems.map((channelItem) => (
        <Background
          channelItem={channelItem}
          key={"backgroundContainer" + channelItem._id}
        />
      ))}

      {channelTtems && channelTtems.map((channelItem) => (
        <Player
          radioJarID={channelItem.radioJarID}
          key={"playerContainer" + channelItem._id}
          locationPlayer={channelItem.locationPlayer}
          timezone={channelItem.timezone}
        />
      ))}

      <Chat />
    </div>
  );
}
