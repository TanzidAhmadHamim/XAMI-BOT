module.exports.config = {
  name: "autodl",
  version: "1.0.",
  permssion: 0,
  credits: "Dipto",
  description: "Fb Vid Downloader",
  category: "other",
  usages: "fb video link",
  prefix: true,
  premium: false,
  cooldowns: 2,
};

module.exports.handleEvent = async function ({ api, event, client, __GLOBAL }) {
  const axios = require('axios');
  const fs = require('fs-extra');
  let dipto = event.body;
  try {
    if (dipto.startsWith('https://vt.tiktok.com') ||
        dipto.startsWith("https://vm.tiktok.com") ||
        dipto.startsWith('https://www.facebook.com') || 
        dipto.startsWith('https://fb.watch')||
        dipto.startsWith('https://www.instagram.com/')|| dipto.startsWith('https://youtu.be/') ||
        dipto.startsWith('https://www.instagram.com/p/') ||    
        dipto.startsWith('https://pin.it/') ||    dipto.startsWith('https://youtube.com/')){
          if (!dipto) {
            api.sendMessage("please put a valid fb video link", event.threadID, event.messageID);
            return;
          }
          const aa = await axios.get(`https://noobs-api.onrender.com/dipto/alldl?url=${encodeURIComponent(dipto)}`);
          const bb = aa.data;
          const MSG = `✅ 🔗 Download Link 🔗 ✅\n\n Title: ${bb.title}`;
          const path = __dirname + `/cache/video.mp4`;
          const vid = (await axios.get(bb.result, { responseType: "arraybuffer" })).data;
          fs.writeFileSync(path, Buffer.from(vid, 'utf-8'));
          api.sendMessage({
            body: `${bb.cp}\n${MSG}\n 🐸🤍`,
            attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
        }
    if (dipto.startsWith('https://i.imgur.com')){
      const dipto3 = dipto.substring(dipto.lastIndexOf('.'));
      const response = await axios.get(dipto, { responseType: 'arraybuffer' });
      const filename = __dirname + `/cache/dipto${dipto3}`;
      fs.writeFileSync(filename, Buffer.from(response.data, 'binary'));
      api.sendMessage({body: `Downloaded from link`,attachment: fs.createReadStream(filename)},event.threadID,
      () => fs.unlinkSync(filename),event.messageID);
    }
  } catch (e) {
    api.sendMessage(`An error occurred: ${e.message}`, event.threadID, event.messageID);
  }
};

module.exports.run = function({ api, event, client, __GLOBAL }) {

}