const LoadTelegramScript = (callback,telegramChatID) => {
    const existingScript = document.getElementById('telegramScript');

    if (!existingScript) {
        // create script to read out iframe
        const script = document.createElement('script');
        script.id = "telegramScript";
        script.src = "https://telegram.org/js/telegram-widget.js?15";
        script.async = true;
        script.dataset.telegramDiscussion = telegramChatID;
        script.dataset.commentsLimit = "5";
        script.dataset.color = "343638";
        script.dataset.dark = "1";
        script.dataset.darkColor = "FFFFFF";

        document.getElementById('Chat').appendChild(script);
        
        script.onload = () => { 
            if (callback) callback();
        };
    }
    
    if (existingScript && callback) callback();
    
}

export default LoadTelegramScript;

