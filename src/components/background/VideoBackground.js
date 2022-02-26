import React, { useEffect } from 'react';
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import './videoBackground.css';

// video testing links
const privateFile = "http://trust.dialectica-machina.com/video/shuttle_red_light.mp4";
const youtubeLink = "https://www.youtube.com/watch?v=bhWJF9FlBqM";
// vimeo > styling not yet adjusted
const vimeoLink = "https://vimeo.com/249086569";

// bitmap testing links
const bitmapLink = "https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1";
// const bitmapLink = "./img/defaultBG.jpg";
const backgroundColor = "blue";

function BackgroundImage() {
  return (
    <div className="backgroundDiv" style={{
      backgroundColor: {backgroundColor},
      background: `url(${bitmapLink})`
      }}>
    </div>
  )
};

function BackgroundVideo() {
  return (
    <div className="backgroundDiv">
      <div className="reactVideoPlayerCoverUp"></div>
      <ReactPlayer
        url={youtubeLink}
        playing={true}
        loop={true}
        muted={true}
        className="reactVideoPlayerComponent"
      />
  </div>
  )
};

export default function Background(props){
  const showContent=(medium)=>{
    if(medium === 'video'){
      return <BackgroundVideo/>
    }else{
      return <BackgroundImage/>
    }
  }
  return(
    <div>
      {showContent(props.medium)}
    </div>
  )
}

// export default(
//   BackgroundImage,
//   BackgroundVideo
// ) 