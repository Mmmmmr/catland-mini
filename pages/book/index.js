import {BookModel} from "../../model/bookModel";
import {LikeModel} from "../../model/likeModel";
import {random} from '../../utils/util.js'
Page({

  data: {
    books: [],
    searching: false
  },

  onLoad: async function (options) {
    const res = await BookModel.getHotList()
    this.setData({books: res})
  },

  onSearching(event){
    this.setData({
      searching:true
    })
  },

  onReachBottom: function (event) {
    this.setData({
      more:random(16)
    })
  },

})
