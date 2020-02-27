import {Http} from "../utils/http";

class ClassicModel {
    static async getLatest(){
        const res = await Http.request('/classic/latest')
        return res
    }
}

export {
    ClassicModel
}
