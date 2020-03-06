import {Http} from "../utils/http";

class ClassicModel {
    static async getMyFavor(index){
        return await Http.request('/classic/favor')
    }


    static async getLatest(){
        const res = await Http.request('/classic/latest')
        wx.setStorageSync(this._getKey(res.index), res)
        this._setLatestIndex(res.index)
        return res
    }

    static async getPrevious(index){
        const res = await Http.request('/classic/' + index + '/previous')
        return res
    }


    static async getById(cid, type) {
        const res = await Http.request(`/classic/${type}/${cid}`)
        return res
    }

    static async getClassic(index, nextOrPrevious){
        let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
        let classic = wx.getStorageSync(key)
        if(!classic){
            const res = await Http.request('/classic/' + index + '/' + nextOrPrevious)
            wx.setStorageSync(this._getKey(res.index), res)
            return res
        } else {
            return classic
        }
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

    static _getKey(index) {
        let key = 'classic-' + index
        return key
    }
}

export {
    ClassicModel
}
