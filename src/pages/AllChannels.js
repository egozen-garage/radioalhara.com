import React, { useState, useEffect } from "react";

import sanityClient from "../client";
// import RadioChannel from "./RadioChannel";
import PreviewChannel from "../components/PreviewChannel";

const AllChannels = () => {
  const [channels, setChannels] = useState(null);

  // Performing queries
  const query = '*[ _type == "radioChannel" && !(_id in path("drafts.**"))] {_id, title, slug, backgroundMedium}'

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

export default AllChannels;
