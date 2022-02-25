import React, { useEffect } from 'react';
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import './videoBackground.css';


const privateFile = "http://trust.dialectica-machina.com/video/shuttle_red_light.mp4";
const youtubeLink = "https://www.youtube.com/watch?v=bhWJF9FlBqM";
// vimeo > styling not yet adjusted
const vimeoLink = "https://vimeo.com/249086569";



// const bitmapLink = "https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1";
const bitmapLink = "./img/defaultBG.jpg";
const backgroundColor = "blue";

const backgroundImageStyle = `
  body{
    background-color: ${backgroundColor};
    z-index: -1;
    background: url("${bitmapLink}");
    background-repeat: no-repeat;
    background-size: cover;
}

  }
`;

function BackgroundImage() {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = backgroundImageStyle;
    document.body.appendChild(style);
    return () => { 
      document.body.removeChild(style); 
    }
  }, [])
  return <div></div>
};

function VideoBackground() {
  return (
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
  )
};

// // const videoBackground = ({ embedId }) => (
// const VideoBackground = () => (

//   // <ReactPlayer
//   // url={props.url}
//   // playing={true}
//   // width={props.width}
//   // height={props.height}
//   // /> 

//   <div id="reactVideoPlayerParent">
//     <div id="reactVideoPlayerCoverUp"></div>
//     <ReactPlayer
//     url={youtubeLink}
//     playing={true}
//     loop={true}
//     muted={true}
//     id="reactVideoPlayerComponent"
//     />
//   </div>
// );

// VideoBackground.propTypes = {
//   embedId: PropTypes.string.isRequired
// };

export default(
  BackgroundImage,
  VideoBackground
) 