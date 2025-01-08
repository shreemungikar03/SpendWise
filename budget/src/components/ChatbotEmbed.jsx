import React, { useEffect } from 'react';

const ChatbotEmbed = () => {
    useEffect(() => {
        // Create and append the config script
        const configScript = document.createElement('script');
        configScript.innerHTML = `
            window.embeddedChatbotConfig = {
                chatbotId: "RHNjKwXJOPyF9pGN5Q0N1",
                domain: "www.chatbase.co"
            };
        `;
        document.body.appendChild(configScript);

        // Create and append the embed script
        const embedScript = document.createElement('script');
        embedScript.src = "https://www.chatbase.co/embed.min.js";
        embedScript.setAttribute('chatbotId', "RHNjKwXJOPyF9pGN5Q0N1");
        embedScript.setAttribute('domain', "www.chatbase.co");
        embedScript.defer = true;

        document.body.appendChild(embedScript);

        // Cleanup function to remove the scripts when the component unmounts
        return () => {
            document.body.removeChild(configScript);
            document.body.removeChild(embedScript);
        };
    }, []);

    return (
        <div>
            {/* You can also add any content here, if necessary */}
        </div>
    );
};

export default ChatbotEmbed;
