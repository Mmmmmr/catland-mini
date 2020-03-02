import {BookModel} from "../../model/bookModel";
import {LikeModel} from "../../model/likeModel";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const res = await BookModel.getHotList()
    this.setData({books: res})
  }

})
