import React, { useEffect, useState } from 'react';
import './player.css';

export default function Player(props) {
  if (props.radioJarID) {
    return (
      <PlayerHTML
        radioJarID={props.radioJarID}
        locationPlayer={props.locationPlayer}
        timezone={props.timezone}
      />
    );
  }
  return null;
}

const PlayerHTML = (props) => {
  const ID = props.radioJarID;
  const location = props.locationPlayer;
  const timezone = props.timezone;

  const [trackTitle, setTrackTitle] = useState('');
  const [trackArtist, setTrackArtist] = useState('');
  const [trackThumb, setTrackThumb] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Clock
  useEffect(() => {
    const updateClock = () => {
      const time = new Date().toLocaleTimeString('en', {
        timeZone: timezone || 'Asia/Jerusalem',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setCurrentTime(time);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, [timezone]);

  // RadioJar init
  useEffect(() => {
    // Expose state setters before script runs
    window.__rhSetArtist = (v) => setTrackArtist(v);
    window.__rhSetTitle = (v) => setTrackTitle(v);
    window.__rhSetThumb = (v) => setTrackThumb(v);

    const playerJS = `
      function runPlayer(){
        rjq('#rjp-radiojar-player').radiojar('player', {
          "streamName": "${ID}",
          "enableUpdates": true,
          "defaultImage": "img/radio-alhara-logo.svg",
          "autoplay": false
        });
        rjq('#rjp-radiojar-player').off('rj-track-load-event');
        rjq('#rjp-radiojar-player').on('rj-track-load-event', function(event, data) {
          if (data.artist && data.artist !== "Unknown") {
            window.__rhSetArtist(data.artist);
          } else {
            window.__rhSetArtist('');
          }
          window.__rhSetTitle(data.title || '');
          window.__rhSetThumb(data.thumb || null);
        });
      }
      runPlayer();
    `;

    const script = document.createElement('script');
    script.innerHTML = playerJS;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      delete window.__rhSetArtist;
      delete window.__rhSetTitle;
      delete window.__rhSetThumb;
    };
  }, [ID]);

  const handlePlay = () => {
    const btn = document.querySelector('.jp-play');
    if (btn) btn.click();
    setIsPlaying(true);
  };

  const handleStop = () => {
    const btn = document.querySelector('.jp-pause');
    if (btn) btn.click();
    setIsPlaying(false);
  };

  return (
    <div id="rh-player-root" className="fixed-top">

      {/* Hidden RadioJar DOM — must stay in page for audio engine */}
      <div style={{ display: 'none' }}>
        <div className="rjp-trackinfo-container">
          <p id="trackInfo"></p>
        </div>
        <div id="rj-cover"></div>
        <div className="rjp-player-container">
          <div id="rjp-radiojar-player"></div>
          <div className="jp-gui jp-interface">
            <div className="jp-controls">
              <button className="jp-play" style={{ display: 'block' }}>&nbsp;</button>
              <button className="jp-pause" style={{ display: 'none' }}></button>
            </div>
          </div>
          <div id="volume_controll" className="jp-volume-bar-wrapper">
            <div className="jp-volume-bar">
              <div className="jp-volume-bar-value"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Visible player card */}
      <div id="rh-player-card">

        <div id="rh-player-station">RADIO ALHARA &nbsp;—&nbsp; راديو الحارة</div>

        <div id="rh-player-middle">
          <div id="rh-player-trackinfo">
            {trackArtist
              ? <div id="rh-player-artist">[{trackArtist}]</div>
              : null
            }
            {trackTitle
              ? <div id="rh-player-title">'{trackTitle}'</div>
              : (!trackArtist && <div id="rh-player-artist">RADIO ALHARA — راديو الحارة</div>)
            }
          </div>
          <div id="rh-player-art">
            {trackThumb
              ? <img src={trackThumb} alt="" />
              : (
                <div id="rh-player-art-placeholder">
                  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="50" cy="50" rx="28" ry="38"
                      fill="none" stroke="white" strokeWidth="2.5"
                      transform="rotate(-20 50 50)" />
                  </svg>
                </div>
              )
            }
          </div>
        </div>

        <div id="rh-player-controls">
          <button id="rh-play-btn" onClick={isPlaying ? handleStop : handlePlay} aria-label={isPlaying ? 'Stop' : 'Play'}>
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                <rect x="3" y="3" width="4" height="10" rx="1"/>
                <rect x="9" y="3" width="4" height="10" rx="1"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                <path d="M3 2L14 8L3 14V2Z"/>
              </svg>
            )}
          </button>

          <div id="rh-player-location">
            <span id="rh-live-dot"></span>
            <span id="rh-location-name">{location ? location.toUpperCase() : 'BETHLEHEM'}</span>
            <span id="rh-clock">{currentTime}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
