import {Http} from "../utils/http";

class LikeModel {
    static async like(behavior, art_id, category){
        let url = behavior == 'like' ? '/like' : '/like/dislike'
        const res = await Http.request(url, 'POST', {
            art_id,
            type: category
        })
    }

    static async getClassicStatus(artId, category){
        const res = await Http.request('/classic/' + category + '/' + artId + '/favor')
        return res
    }
}



export {
    LikeModel
}
