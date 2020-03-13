import {promisic} from "./util";
import {config} from "../config/config";
import { Base64 } from 'js-base64';
import {Token} from "../model/token";

const tips = {
    1: '抱歉，出现了一个错误',
    10006: 'token不合法'
}

class Http {
    static async request(url, method = 'GET', data = {}){
        return await Http._request(url, method, data)
    }

    static async _request(url, method ,data){
        let res
        try{
            res = await promisic(wx.request)({
                url: `${config.baseUrl}${url}`,
                method,
                data,
                header: {
                    'content-type': 'application/json',
                    Authorization: this._encode()
                }
            })
        } catch (e) {
            this._show_error(1)
        }
        const code = res.statusCode.toString()
        if(code.startsWith('2')){
            return res.data
        }else {
            if(code.startsWith('4')){
                if(code === '403'){
                    res = await this._refetch(url, method, data)
                    return res.data
                }
            }
        }
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

    static _show_error(error_code){
        if(!error_code){
            error_code = 1
        }
        wx.showToast({
            title: tips[error_code],
            icon: 'none',
            duration: 2000
        })
    }
}

export {Http}
