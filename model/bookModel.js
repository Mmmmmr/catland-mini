import {Http} from "../utils/http";

class BookModel {
    static async getHotList(){
        return await Http.request('/book/hot_list')
    }

    static async getDetail(bid){
        return await Http.request(`/book/${bid}/detail`)
    }

    static async postComment(bid, comment){
        return await Http.request('/book/add/short_comment', 'POST', {book_id: bid, content: comment})
    }

    static async getLikeStatus(bid){
        return await Http.request(`/book/${bid}/favor`)
    }

    static async getComments(bid) {
        return await Http.request(`/book/${bid}/short_comment`)
    }
}

export {BookModel}
