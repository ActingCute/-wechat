/*
 * @Author: zhanghui rem486@qq.com
 * @Date: 2022-12-13 09:44:42
 * @LastEditors: zhanghui rem486@qq.com
 * @LastEditTime: 2022-12-13 11:32:47
 * @FilePath: \wechat-chatgpt\src\msg.ts
 * @Description: 说明
 */
import axios from "axios";
const token = "2X4xdKYO1kcByDWYZGqxgqqzi1zsQy";
const baseUrl = "https://openai.weixin.qq.com/openapi";
class Http {
  async getMsg(msg: string, userid: any) {
    if (msg) {
      const signUrl = `/sign/${token}`;
      let data = await axios.request({
        baseURL: baseUrl,
        method: "post",
        url: signUrl,
        data: JSON.stringify({ userid }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log({ data });

      if (data.data.signature && data.data.expiresIn) {
        const signUrl = `/aibot/${token}`;
        let data1: any = await axios.request({
          baseURL: baseUrl,
          method: "post",
          url: signUrl,
          data: JSON.stringify({
            signature: data.data.signature,
            query: msg,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log({ data1 });
        if (data1.data.answer) {
          return data1.data.answer;
        }
      }
    }
    return "";
  }
}

export default Http;
