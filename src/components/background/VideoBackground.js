import React from 'react';
import ReactPlayer from "react-player";
import sanityClient from "../../client";
import { getFile } from "@sanity/asset-utils";
// import imageUrlBuilder from "@sanity/image-url";

// import PropTypes from "prop-types";
import './videoBackground.css';

const backgroundColor = "black";

function BackgroundColor() {
  return (
    <div className="backgroundDiv">
      <div id="backgroundImage" style={{ backgroundColor: {backgroundColor},}}></div>
    </div>
  )
};

function BackgroundImage(channelItem) {
  return (
    <div className="backgroundDiv">
      <div id="backgroundImage" style={{
      backgroundColor: {backgroundColor},
      backgroundImage: `url(${channelItem.channelItem.bitmapLink})`
      }}></div>
    </div>
  )
};

function BackgroundVideo(channelItem) {
  const file = getFile(channelItem.channelItem.videoFile, sanityClient.config());
  return (
    <div className="backgroundDiv">
      <div className="reactVideoPlayerCoverUp"></div>
      <ReactPlayer
        url={file.asset.url}
        // url={urlFor(category.image).url()}
        playing={true}
        loop={true}
        muted={true}
        className="reactVideoPlayerComponent"
      />
  </div>
  )
};

export default function Background(props){
  const showContent=(props)=>{
    console.log("current medium: " + props.channelItem.videoFile);
    if(props.channelItem.backgroundMedium === "videoFile" && props.channelItem.videoFile){
      return <BackgroundVideo  channelItem={props.channelItem}/>
    } 
    if(props.channelItem.backgroundMedium === "bitmapLink" && props.channelItem.bitmapLink){
      return <BackgroundImage  channelItem={props.channelItem}/>
    }else{
      return <BackgroundColor/>
    }
  }
  console.log("DATA Background medium: " + props.medium);
  return(
    <div>
      {showContent(props)}
    </div>
  )
}