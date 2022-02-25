import React, {useEffect} from 'react'
import './chat.css';
import './telegramStyle.css';

// var _style  = ` 
// body.body_widget_discussion {
//     background: rgba(0, 0, 0, 0) !important;
// }
// ` 




function Chat() {


    useEffect(() => {
        const script = document.createElement('script');

        script.src = "https://telegram.org/js/telegram-widget.js?15";
        script.async = true;
        script.dataset.telegramDiscussion = "alharachannel/5";
        script.dataset.commentsLimit = "5";
        script.dataset.color = "343638";
        script.dataset.dark = "1";
        script.dataset.darkColor = "FFFFFF";

        document.body.appendChild(script);



        return () => {
            document.body.removeChild(script);
        }
    }, []) 
    // maybe for future:
    // to define when the script should be called, we can declare a [resouceType]
    // for example: "alharachannel/5" 


    return <div></div>

}

export default Chat