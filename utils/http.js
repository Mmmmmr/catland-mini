import {promisic} from "./util";
import {config} from "../config/config";
import { Base64 } from 'js-base64';
import {Token} from "../model/token";

class Http {
    static async request(url, method = 'GET', data = {}){
        return await Http._request(url, method, data)
    }

    static async _request(url, method ,data){
        let res
         res = await promisic(wx.request)({
           url: `${config.baseUrl}${url}`,
           method,
           data,
           header: {
               Authorization: this._encode()
           }
       })
        const code = res.statusCode.toString()
        if(code.startsWith('4')){
            if(code === '403'){
                res = await this._refetch(url, method, data)
            }
        }
        return res
   }

    static async _refetch(url, method, data){
        let token = new Token()
        await token.getTokenFromServer()
        return await promisic(wx.request)({
            url: `${config.baseUrl}${url}`,
            method,
            data,
            header: {
                Authorization: this._encode()
            }
        })
    }

    static _encode(){
        const token = wx.getStorageSync('token')
        const result = Base64.encode(`${token}:`);
        return 'Basic ' + result
    }
}

export {Http}
