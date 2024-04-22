module.exports.config = {
 name: "help",
 version: "2.0.0",
 permssion: 0,
 prefix: true,
 premium: false,
 credits: "Hamim",//Don't Change Credits And You Can Change The Gif Or Img If You Want Just Put The Link Of Your Gif Or Img To The Var Link
 description: "commands list",
 category: "system",
 usages: "module name",
 cooldowns: 1,
 envConfig: {
  autoUnsend: false,
  delayUnsend: 300
 }
};

module.exports.languages = {
 "en": {
		"moduleInfo": "►[ %1 ]◄\n●𝗨𝘀𝗮𝗴𝗲: %3\n●𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: %4\n●𝗪𝗮𝗶𝘁𝗶𝗻𝗴 𝘁𝗶𝗺𝗲: %5 seconds(s)\n●𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻: %6\n\n►𝗠𝗼𝗱𝘂𝗹𝗲 𝗰𝗼𝗱𝗲 𝗯𝘆 %7 ◄ ",
		"helpList": '[ There are %1 commands on this bot, Use: "%2help nameCommand" to know how to use! ]',
		"user": "User",
        "adminGroup": "Admin group",
        "adminBot": "Admin bot"
	}
};

module.exports.handleEvent = function ({ api, event, getText }) {
 const { commands } = global.client;
 const { threadID, messageID, body } = event;

 if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;
 const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
 if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
 const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
 const command = commands.get(splitBody[1].toLowerCase());
 const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
 return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
}

module.exports. run = function({ api, event, args, getText }) {
  const axios = require("axios");
  const request = require('request');
  const fs = require("fs-extra");
 const { commands } = global.client;
 const { threadID, messageID } = event;
 const command = commands.get((args[0] || "").toLowerCase());
 const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
 const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
 const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
if (args[0] == "all") {
    const command = commands.values();
    var group = [], msg = "";
    for (const commandConfig of command) {
      if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
      else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
    }
    group.forEach(commandGroup => msg += `❄️ ${commandGroup.group.charAt(0).toUpperCase() + commandGroup.group.slice(1)} \n${commandGroup.cmds.join(' • ')}\n\n`);

    return axios.get('https://loidsenpaihelpapi.miraiandgoat.repl.co').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
      let admID = "100080456630885";

      api.getUserInfo(parseInt(admID), (err, data) => {
      if(err){ return console.log(err)}
     var obj = Object.keys(data);
    var firstname = data[obj].name.replace("@", "");
    let callback = function () {
        api.sendMessage({ body:`✿🄲🄾🄼🄼🄰🄽🄳 🄻🄸🅂🅃✿\n\n` + msg + `✿══════════════✿\n│𝗨𝘀𝗲 ${prefix}help [Name?]\n│𝗨𝘀𝗲 ${prefix}help [Page?]\n│𝗡𝗔𝗠𝗘 𝗢𝗪𝗡𝗘𝗥 : \n│𝗛𝗔𝗠𝗜𝗠✘2\n│𝗧𝗢𝗧𝗔𝗟 :  ${commands.size}\n————————————`, mentions: [{
                           tag: firstname,
                           id: admID,
                           fromIndex: 0,
                 }],
            attachment: fs.createReadStream(__dirname + `/cache/472.${ext}`)
        }, event.threadID, (err, info) => {
        fs.unlinkSync(__dirname + `/cache/472.${ext}`);
        if (autoUnsend == false) {
            setTimeout(() => {
                return api.unsendMessage(info.messageID);
            }, delayUnsend * 1000);
        }
        else return;
    }, event.messageID);
        }
         request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/472.${ext}`)).on("close", callback);
     })
      })
};
 if (!command) {
  const arrayInfo = [];
  const page = parseInt(args[0]) || 1;
    const numberOfOnePage = 15;
    let i = 0;
    let msg = "";

    for (var [name, value] of (commands)) {
      name += ``;
      arrayInfo.push(name);
    }

    arrayInfo.sort((a, b) => a.data - b.data);

const first = numberOfOnePage * page - numberOfOnePage;
    i = first;
    const helpView = arrayInfo.slice(first, first + numberOfOnePage);


    for (let cmds of helpView) msg += `╭────────────❍\n╰➤   ${cmds} \n`;
    const siu = `╭──«~»──CMD──«~»──╮\n\n🄿🄰🄶🄴:  [${page}/${Math.ceil(arrayInfo.length/numberOfOnePage)}]`;
const text = `\n\n╰➤𝗨𝘀𝗲 ${prefix}help [Name?]\n╰➤𝗨𝘀𝗲 ${prefix}help [Page?]\n╰➤ 𝗧𝗢𝗧𝗔𝗟 : [${arrayInfo.length}]\n╰➤𝗡𝗔𝗠𝗘 𝗢𝗪𝗡𝗘𝗥 :XAMI\n╰➤𝗙𝗜𝗟𝗘 𝗕𝗬: 𝗛𝗔𝗠𝗜𝗠✘2`; 
    var link = [
"https://i.imgur.com/4TgBe2R.jpg",
"https://i.imgur.com/4TgBe2R.jpg",
"https://i.imgur.com/4TgBe2R.jpg",
"https://i.imgur.com/4TgBe2R.jpg",
"https://i.imgur.com/4TgBe2R.jpg",
"https://i.imgur.com/4TgBe2R.jpg",
"https://i.imgur.com/4TgBe2R.jpg",
    ]
     var callback = () => api.sendMessage({ body: siu + "\n\n" + msg  + text, attachment: fs.createReadStream(__dirname + "/cache/loidbutter.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/loidbutter.jpg"), event.messageID);
    return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/loidbutter.jpg")).on("close", () => callback());
 }
const leiamname = getText("moduleInfo", command.config.name, command.config.description, `${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits);
 
  var link = [
"https://i.imgur.com/4TgBe2R.jpg",
  ]
    var callback = () => api.sendMessage({ body: leiamname, attachment: fs.createReadStream(__dirname + "/cache/loidbutter.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/loidbutter.jpg"), event.messageID);
    return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/loidbutter.jpg")).on("close", () => callback());
};