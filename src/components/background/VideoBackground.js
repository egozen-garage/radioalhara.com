import React from 'react';
import ReactPlayer from "react-player";
import sanityClient from "../../client";
import { getFile } from "@sanity/asset-utils";
// import imageUrlBuilder from "@sanity/image-url";

// import PropTypes from "prop-types";
import './videoBackground.css';

// // video testing links
// const privateFile = "http://trust.dialectica-machina.com/video/recordat28.gif.mp4";
// const youtubeLink = "https://www.youtube.com/watch?v=O0YYf2Xn7oA&ab_channel=thekinolibrary";
// // vimeo > styling not yet adjusted
// const vimeoLink = "https://vimeo.com/249086569";

// // bitmap testing links
// // const bitmapLink = "https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1";
// // const bitmapLink = "./img/defaultBG.jpg";
const backgroundColor = "blue";

function BackgroundImage(channelItem) {
  console.log("image url: " + channelItem.channelItem.bitmapLink);
  return (
    <div className="backgroundDiv">
      <div id="backgroundImage" style={{
      backgroundColor: {backgroundColor},
      backgroundImage: `url(${channelItem.channelItem.bitmapLink},)`
      // background: `url("https://64.media.tumblr.com/00af5b5e3e6912a5e5a56e63231bf657/tumblr_na9invhkBl1tvgexko1_400.gifv")`
      }}></div>
    </div>
  )
};

function BackgroundVideo(channelItem) {
  const file = getFile(channelItem.channelItem.videoFile, sanityClient.config());
  console.log(file.asset.url);
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
    console.log("current medium: " + props.channelItem.backgroundMedium);
    if(props.channelItem.backgroundMedium === "videoFile"){
      return <BackgroundVideo  channelItem={props.channelItem}/>
    } 
    if(props.channelItem.backgroundMedium === "bitmapLink"){
      return <BackgroundImage  channelItem={props.channelItem}/>
    }else{
      return <BackgroundImage/>
    }
  }
  console.log("DATA Background medium: " + props.medium);
  return(
    <div>
      {showContent(props)}
    </div>
  )
}

// export default(
//   BackgroundImage,
//   BackgroundVideo
// ) 