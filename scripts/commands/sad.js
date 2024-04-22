module.exports.config = {
 name: "sad",//type your commands name!
 version: "0.0.6",// don't change this version!
 permssion: 0,
 premium: false,
 prefix: true,
 credits: "XANVIR",// respect the main owner//
 description: "Some more emotional sadness shorts video available our (HAMIM_2X) server ✅",//here is this commands description//
 category: "SAD_VIDEO",// here is  this commands category()
 usages: "/sad",// here is using helper//
 cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs": ""
  }
};

const videoURL = "https//x2-video-api.onrender.com/sad/"; // Insert the actual URL of the video here

module.exports.run = async ({ api, event }) => {
    global.nodemodule["axios"]
        .get(videoURL)
        .then(res => {
            global.nodemodule["axios"]
                .get(encodeURI(res.data.resultX2.data), { responseType: "arraybuffer" })
                .then(ress => {
                    let path = __dirname + `/2X_SAD_#2024/${Date.now()}.mp4`;
                    global.nodemodule["fs"].writeFileSync(path, Buffer.from(ress.data, 'utf-8'));
                    var bdy = "--『 𝐇𝟒𝐌𝟏𝐌 🄰🄿🄸 』--";
                    api.sendMessage({
                        body: bdy,
                        attachment: global.nodemodule["fs"].createReadStream(path)
                    }, event.threadID, () =>
                        global.nodemodule["fs"].unlinkSync(path), event.messageID);
                    return;
                })
                .catch(e => {
                    api.sendMessage("❐  Error: Failed to fetch video data.", event.threadID, event.messageID);
                    return;
                });
        })
        .catch(e => {
            api.sendMessage("❐  Error: Failed to fetch video URL.", event.threadID, event.messageID);
            return;
        });

    return;
}