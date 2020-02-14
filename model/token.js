import {config} from "../config/config";
import {promisic} from "../utils/util";

class Token {
    constructor() {
        this.verifyUrl = config.baseUrl + '/token/verify';
        this.tokenUrl = config.baseUrl + '/token';
    }

    verify(){
        const token = wx.getStorageSync('token')
        if(!token){
            this.getTokenFromServer()
        }else {
            this.verifyFromServer(token)
        }
    }

    async getTokenFromServer(){
        const codeRes = await promisic(wx.login)()
        const tokenRes = await promisic(wx.request)({url: this.tokenUrl, method: 'POST', data: {account:codeRes.code, type: 100}})
        wx.setStorageSync('token', tokenRes.data.token)
    }

    async verifyFromServer(token){
        const res = await promisic(wx.request)({
            url: this.verifyUrl,
            method: 'POST',
            data: {
                token: token
            }
        })
        const valid = res.data.valid
        if(!valid){
            this.getTokenFromServer()
        }
    }

}
export {
    Token
}
