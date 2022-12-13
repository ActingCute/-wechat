/*
 * @Author: zhanghui rem486@qq.com
 * @Date: 2022-12-12 09:24:45
 * @LastEditors: zhanghui rem486@qq.com
 * @LastEditTime: 2022-12-13 09:38:19
 * @FilePath: \wechat-chatgpt\src\main.ts
 * @Description: 说明
 */
import { WechatyBuilder } from "wechaty";
import QRCode from "qrcode";
import { ChatGPTBot } from "./chatgpt.js";
const chatGPTBot = new ChatGPTBot();

const bot = WechatyBuilder.build({
  name: "wechat-assistant", // generate xxxx.memory-card.json and save login data for the next login
});
// get a Wechaty instance

async function main() {
  bot
    .on("scan", async (qrcode, status) => {
      const url = `https://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`;
      console.log(`Scan QR Code to login: ${status}\n${url}`);
      console.log(
        await QRCode.toString(qrcode, { type: "terminal", small: true })
      );
    })
    .on("login", async (user) => {
      console.log(`User ${user} logged in`);
      chatGPTBot.setBotName(user.name());
      await chatGPTBot.startGPTBot();
    })
    .on("message", async (message) => {
      if (message.text().startsWith("/ping ")) {
        await message.say("pong");
        return;
      }
      try {
        console.log(`Message: ${message}`);
        await chatGPTBot.onMessage1(message);
        //https://api.ownthink.com/bot?appid=e19477e732c977aec129e793ca19bfac&userid=6965c35f54f1474886c31da89fc83032&spoken=%E5%A7%9A%E6%98%8E%E5%A4%9A%E9%AB%98%E5%95%8A%EF%BC%9F
      } catch (e) {
        console.error(e);
      }
    });
  try {
    await bot.start();
  } catch (e) {
    console.error(
      `⚠️ Bot start failed, can you log in through wechat on the web?: ${e}`
    );
  }
}
main();
