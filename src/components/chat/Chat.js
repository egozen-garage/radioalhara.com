import React, {useEffect} from 'react'
import './chat.css';

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
        script.dataset.color = "00000000";
        script.dataset.darkColor = "ffffff";

        document.body.appendChild(script);

        

        var telegramBG = document.getElementById("telegram-discussion-alharachannel-5-1").getElementsByTagName[0];
        console.log(telegramBG);
        // var telegramBG = document.getElementsByClassName("body_widget_discussion")[0];
        // telegramBG.style.background = "blue !important";


        return () => {
            document.body.removeChild(script);
        }
    }, []) 
    // maybe for future:
    // to define when the script should be called, we can declare a [resouceType]
    // for example: "alharachannel/5"


    return <h1>chat in progress</h1>

}

export default Chat