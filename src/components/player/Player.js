// import React from 'react';
import React, { useEffect } from 'react';
import './player.css';


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

const playerHTML = (
    // <div id="playerContainer">
    
    // </div>
    <div id="player" className="col-lg-12">
                <div id="rj-cover">
                    <img id="" src="/img/radio-alhara-logo.svg" style={{ width: "100px" }} alt="" />
                </div>
        <div id="rj-player" className="fixed-top">
            <div className="player-v3 player-medium">
                <div id="player_box" className="info">
                    <div className="rjp-trackinfo-container">
                        <p id="trackInfo" className="rjp-info"> </p>
                    </div>
                    <div className="rjp-player-container">
                        <div id="rjp-radiojar-player"></div>
                        <div id="rj-player-controls" className="rj-player-controls">
                            <div className="jp-gui jp-interface">
                                <div className="jp-controls">

                                    <button style={{ display: "block" }} className="jp-play" title="Play">&nbsp;
                                        <svg version="1.1" id="play" x="0px" y="0px" height="85px" width="85px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100">
                                            <path className="stroke-solid" fill="none" stroke="#fff"  d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7C97.3,23.7,75.7,2.3,49.9,2.5"/>
                                            <path className="icon" fill="#fff" d="M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z"/>
                                        </svg>
                                    </button>
                                    <button style={{ display: "none" }}  className="jp-pause" title="Pause"><i className="icon-pause"></i></button>
                                </div>
                            </div>
                        </div>

                        <div className="live-broadcasting">
                            <div className="live"></div><span> Bethlehem</span><span className="clock"></span></div>

                        <div id="volume_controll" className="jp-volume-bar-wrapper">
                            <div className="jp-volume-bar">
                                <div className="jp-volume-bar-value"></div>
                            </div>
                        </div>
                
                        <div className="jp-no-solution">
                            <span>Update Required</span>
                            Use Firefox.
                        </div>
                    </div>
                </div>

                {/* <div className="rjp-player-container">
                    <div id="volume_controll" className="jp-volume-bar-wrapper">
                        <div className="jp-volume-bar">
                            <div className="jp-volume-bar-value"></div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    </div>
)

function Player() {

    useEffect(() => {
        const script = document.createElement('script');
        script.innerHTML = playerJS;
        document.body.appendChild(script);
        return () => { 
            document.body.removeChild(script); 
        }
    }, [])

    //     console.log("script2 mounted");    

    return (
        playerHTML
    )
}






export default Player
