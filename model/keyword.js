import {Http} from "../utils/http";

class KeywordModel {
    key = 'q'
    maxLength = 10
    getHistory(){
        const words = wx.getStorageSync(this.key)
        if(!words){
            return []
        }
        return words
    }

    async getHot(){
        return await Http.request('/book/hot_keyword')
    }

    addToHistory(keyword){
        let words = this.getHistory()
        const has = words.includes(keyword)
        if(!has){
            const length = words.length
            if(length >= this.maxLength){
                words.pop()
            }
            words.unshift(keyword)
            wx.setStorageSync(this.key, words)
        }
    }
}

export {KeywordModel}
