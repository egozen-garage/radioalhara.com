// import React from 'react';
import React, { useEffect } from 'react';
import './player.css';


const playerHTML = (
    //     <div id="rj-player">
    //     <div className="rjp-player-container">
    //         <div id="rjp-radiojar-player"></div>
    //         <div id="rj-player-controls" className="rj-player-controls">
    //             <div className="jp-gui jp-interface">
    //                 <div className="jp-controls">
    //                     <button style={{ display: "block" }} className="jp-play" title="Play">&nbsp;<i className="icon-play"></i></button>
    //                     <button style={{ display: "none" }} className="jp-pause" title="Pause"><i className="icon-pause"></i></button>
    //                 </div>
    //             </div>
    //             <div className="jp-no-solution">
    //                 <span>Update Required</span>
    //                 To play the media you will need to either update your browser to a recent version or update your <a href="//get.adobe.com/flashplayer/" target="_blank" rel='noreferrer'>Flash plugin</a>.
    //             </div>
    //         </div>
    //     </div>
    // </div>

    <div id="player" class="col-lg-12">
        <div id="rj-player" class="fixed-top">
            <div class="player-v3 player-medium">
                {/* <div id="rj-cover">
                    <img id="" src="/img/radio-alhara-logo.svg" style={{ width: "100px" }} alt="" />
                </div> */}
                <div id="player_box" class="info">
                    <div class="rjp-trackinfo-container">
                        <p id="trackInfo" class="rjp-info"> </p>
                    </div>
                    <div class="rjp-player-container">
                        <div id="rjp-radiojar-player"></div>
                        <div id="rj-player-controls" class="rj-player-controls">
                            <div class="jp-gui jp-interface">
                                <div class="jp-controls">

                                    <button style={{ display: "block" }} class="jp-play" title="Play">&nbsp;
                                        <svg version="1.1" id="play" x="0px" y="0px" height="85px" width="85px" viewBox="0 0 100 100" enable-background="new 0 0 100 100">
                                            <path class="stroke-solid" fill="none" stroke="#fff"  d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7C97.3,23.7,75.7,2.3,49.9,2.5"/>
                                            <path class="icon" fill="#fff" d="M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z"/>
                                        </svg>
                                    </button>
                                    <button style={{ display: "none" }}  class="jp-pause" title="Pause"><i class="icon-pause"></i></button>

                                </div>
                            </div>
                        </div>

                        <div class="live-broadcasting">
                            <div class="live"></div><span> Bethlehem</span><span class="clock"></span></div>

                        {/* <div id="volume_controll" class="jp-volume-bar-wrapper">
                            <div class="jp-volume-bar">
                                <div class="jp-volume-bar-value"></div>
                            </div>
                        </div> */}
                
                        <div class="jp-no-solution">
                            <span>Update Required</span>
                            Use Firefox.
                        </div>
                    </div>
                </div>

                {/* <div class="rjp-player-container">
                    <div id="volume_controll" class="jp-volume-bar-wrapper">
                        <div class="jp-volume-bar">
                            <div class="jp-volume-bar-value"></div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>

    </div>

)


// rjq("#rjp-radiojar-player").radiojar("player", {
//     streamName: "78cxy6wkxtzuv",
//     enableUpdates: true,
    // defaultImage: "img/radio-alhara-logo.svg",
//     autoplay: false
// });
var rjID = "'78cxy6wkxtzuv'";
const playerJS = `

    function runPlayer(){
        rjq('#rjp-radiojar-player').radiojar('player', {
            "streamName": ${rjID}, // HEY HEY HEY, PASTE HERE YOUR RADIO JAR STREAM CODE <3
            "enableUpdates": true,
            "defaultImage": "img/radio-alhara-logo.svg",
            "autoplay":false
        });
        rjq('#rjp-radiojar-player').off('rj-track-load-event');
        rjq('#rjp-radiojar-player').on('rj-track-load-event', function(event, data) {
            updateInfo(data);
            if  (data.artist === "Unknown") {
                    rjq('.rjp-trackinfo-container').show();
                    rjq('#trackInfo').html('Radio alHara' + ' - ' + data.title + '')
                } else if (data.title != "" || data.artist != "") {
                    rjq('.rjp-trackinfo-container').show();
                    rjq('#trackInfo').html(data.artist + ' - ' + data.title + '')
        
                } else {
                    rjq('.rjp-trackinfo-container').show();
                rjq('#trackInfo').html('Radio alHara')
                }
        
        });
    }
    function updateInfo(data) {
        if (data.thumb) {
        rjq('#rj-cover').html('<a href="#"><img src="' + data.thumb + '" alt="" title="" /></a>')
        } else {
        rjq('#rj-cover').html('')
        }
    }
    runPlayer();
       
`;

// rjq('#rjp-radiojar-player').off('rj-track-load-event');
// rjq('#rjp-radiojar-player').on('rj-track-load-event', function(event, data) {
// updateInfo(data);
//     if  (data.artist === "Unknown") {
//             rjq('.rjp-trackinfo-container').show();
//             rjq('#trackInfo').html('Radio alHara' + 
//             ' - ' + data.title + '')
//         } else if (data.title !== "" || data.artist !== "") {
//             rjq('.rjp-trackinfo-container').show();
//             rjq('#trackInfo').html(data.artist + ' - ' + data.title + '')

//     } else {
//             rjq('.rjp-trackinfo-container').show();
//         rjq('#trackInfo').html('Radio alHara')
//     }
// });
// function updateInfo(data) {
//     if (data.thumb) {
//       rjq('#rj-cover').html('<a href="#"><img src="' + data.thumb + '" alt="" title="" /></a>')
//     } else {
//       rjq('#rj-cover').html('')
//     }
// } 


function Player() {

    useEffect(() => {
        const script2 = document.createElement('script');
        // script2.innerHTML = 'rjq("#rjp-radiojar-player").radiojar("player", {streamName: "78cxy6wkxtzuv", autoplay: false});'
        script2.innerHTML = playerJS;
        document.body.appendChild(script2);
        return () => {
            document.body.removeChild(script2);
        }
    }, [])
    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.type="text/javascript" 
    //     script.src="//www.radiojar.com/wrappers/api-plugins/v1/radiojar-min.js"
    //     document.body.appendChild(script);
    //     console.log("script mounted");    
    //     return () => {
    //         document.body.removeChild(script);
    //     }
    // }, []) 

    return (
        playerHTML
    )
}

export default Player