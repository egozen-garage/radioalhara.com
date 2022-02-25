import React from "react";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import './videoBackground.css';


const privateFile = "http://trust.dialectica-machina.com/video/shuttle_red_light.mp4";
const youtubeLink = "https://www.youtube.com/watch?v=bhWJF9FlBqM";
// vimeo > styling not yet adjusted
const vimeoLink = "https://vimeo.com/249086569";

// const videoBackground = ({ embedId }) => (
const VideoBackground = () => (

  // <ReactPlayer
  // url={props.url}
  // playing={true}
  // width={props.width}
  // height={props.height}
  // /> 

  <div id="reactVideoPlayerParent">
    <div id="reactVideoPlayerCoverUp"></div>
    <ReactPlayer
    url={youtubeLink}
    playing={true}
    loop={true}
    muted={true}
    id="reactVideoPlayerComponent"
    />
  </div>
);

VideoBackground.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default VideoBackground;