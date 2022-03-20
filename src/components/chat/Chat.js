import React, {useState, useEffect} from 'react'
import './chat.css';
import LoadTelegramScript from '../scripts/LoadTelegramScript'

// const telegramChatID = "alharachannel/5";

// const iframeStyle = `
//   #telegram-discussion-radioalhara-${telegramChatID}-1{
//     width: 500px;
//     z-index: 100;
//     border-radius: 15px;
//     margin-top: -70px;
//     margin-left: 140px !important;
//   }
// `;

// OLD CHAT FUNCTION STAND: 19. März 2020
// https://betterprogramming.pub/loading-third-party-scripts-dynamically-in-reactjs-458c41a7013d
/* const Chat = (props) => {

    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        LoadTelegramScript(() => {
            setLoaded(true);
          }, props.telegramChatID);
    });


    return ( 
      <div className="telegram-component">
        {}
      </div>
    );
  }

export default Chat */

export default function Chat(props) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    LoadTelegramScript(() => {
        setLoaded(true);
      }, props.telegramChatID);
  });
  
  return <div id="Chat"></div>

}


// export default function Chat() {
//     useEffect(() => {
//         const script = document.createElement('script');
//         script.src = "https://telegram.org/js/telegram-widget.js?15";
//         script.async = true;
//         script.dataset.telegramDiscussion = "alharachannel/5";
//         script.dataset.commentsLimit = "5";
//         script.dataset.color = "343638";
//         script.dataset.dark = "1";
//         script.dataset.darkColor = "FFFFFF";

//         document.body.appendChild(script);
        
//         return () => {
//             document.body.removeChild(script);
//         }
//     }, []) 
//     return <div></div>
// }


// export default function Chat() {

