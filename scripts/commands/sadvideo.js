const axios = require('axios');
const fs = require('fs');

module.exports.config = {
    name: "sadvideo", 
    version: "1.0.0", 
    permssion: 0, 
    premium: false,
    prefix: true,
    credits: "HAMIM",
    description: "SOME SAD VIDEO BY X2 SERVER",
    category: " VIDEO", 
    usages: "/sad",
    cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
    try {
      const rt = await axios.get("https://x2-video-api.onrender.com/sad")
      const url = rt.data.resultX2.data;
        const response = await axios.get(url, { responseType: "stream" });

        const videoPath = './sad_video.mp4';
        const writer = fs.createWriteStream(videoPath);

        response.data.pipe(writer);

        writer.on('finish', () => {
            api.sendMessage({ body: "--『 𝐇𝟒𝐌𝟏𝐌 API 』--", attachment: fs.createReadStream(videoPath) }, event.threadID);
        });

        writer.on('error', (err) => {
            console.error(err);
        });
    } catch (e) {
        console.log(e);
    }
};