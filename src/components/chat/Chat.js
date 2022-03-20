import React, {useState, useEffect} from 'react'
import './chat.css';
import LoadTelegramScript from '../scripts/LoadTelegramScript'

export default function Chat(props) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    LoadTelegramScript(() => {
        setLoaded(true);
      }, props.telegramChatID);
  });
  
  return <div id="Chat"></div>
}