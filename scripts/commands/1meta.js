const axios = require("axios");

module.exports.config = {
    name: "meta",
    version: "1",
    permission: 0,
		premium: false,
    prefix: true,
    credits: "Hamim",
    description: "Simsimi",
    usages: "Message",
    category: "...",
    cooldowns: 0
};

module.exports.run = async ({ api, event, args }) => {
    try {
        let message = args.join(" ");
        if (!message) {
            return api.sendMessage(`Hi jaaan,I'm Xami meta from X2 server..`, event.threadID, event.messageID);
        }

        const response = await axios.get(`https://x2-api.onrender.com/sim?type=ask&ask=${message}`);
        const respond = response.data.answer;
        api.sendMessage(respond, event.threadID, event.messageID);
    } catch (error) {
        console.error("An error occurred:", error);
        api.sendMessage("Oops! Something went wrong.", event.threadID, event.messageID);
    }
};