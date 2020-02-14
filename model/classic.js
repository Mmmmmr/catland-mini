import {Http} from "../utils/http";

class Classic {
    static async getLatest(){
        const res = await Http.request('/classic/latest')
        return res
    }
}

export {
    Classic
}
