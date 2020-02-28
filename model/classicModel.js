import {Http} from "../utils/http";

class ClassicModel {
    static async getLatest(){
        const res = await Http.request('/classic/latest')
        this._setLatestIndex(res.index)
        return res
    }

    static async getPrevious(index){
        const res = await Http.request('/classic/' + index + '/previous')
        return res
    }

    static async getClassic(index, nextOrPrevious){
        const res = await Http.request('/classic/' + index + '/' + nextOrPrevious)
        return res
    }

    static isFirst(index){
        return index === 1 ? true : false
    }

    static isLatest(index){
        let latestIndex = this._getLatestIndex()
        return latestIndex === index ? true : false
    }

    static _setLatestIndex(index){
        wx.setStorageSync('latest', index)
    }

    static _getLatestIndex(){
        let index = wx.getStorageSync('latest')
        return index
    }
}

export {
    ClassicModel
}
