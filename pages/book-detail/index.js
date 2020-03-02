import {BookModel} from "../../model/bookModel";
import {LikeModel} from "../../model/likeModel";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    detail: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    wx.showLoading()
    const bid = options.bid
    // const detail = await BookModel.getDetail(bid)
    // const comments = await BookModel.getComments(bid)
    // const likeStatus = await BookModel.getLikeStatus(bid)
    const res = await Promise.all([BookModel.getDetail(bid), BookModel.getComments(bid),  BookModel.getLikeStatus(bid)])
    this.setData({
      comments: res[1].comments,
      book: res[0],
      likeStatus: res[2].like_status,
      likeCount: res[2].fav_nums
    })
    wx.hideLoading()
  },

  async onLike(event){
    const like_or_cancel = event.detail.behavior
    await LikeModel.like(like_or_cancel, this.data.book.id, 400)
  },

  onFakePost(){
    this.setData({
      posting: true
    })
  },

  onCancel(){
    this.setData({
      posting: false
    })
  },

  async onPost(event){
    const comment = event.detail.text || event.detail.value

    if (!comment) {
      return
    }

    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }

    await BookModel.postComment(this.data.book.id, comment)

    wx.showToast({
      title: '+ 1',
      icon: 'none'
    })

    if(this.data.comments.length > 0){
      this.data.comments.unshift({
        content: comment,
        nums: 1
      })
    }

    this.setData({
      comments: this.data.comments,
      posting: false
    })
  }
})
