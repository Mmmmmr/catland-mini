import {ClassicModel} from "../../model/classicModel";
import {promisic} from "../../utils/util";
import {BookModel} from "../../model/bookModel";
import {config} from "../../config/config";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  onShow(options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },

  async getMyFavor() {
    const res = await ClassicModel.getMyFavor()

    res.forEach((element) => {
      element.image = `${config.url}${element.image}`
    })

    this.setData({
      classics: res
    })
  },

  async getMyBookCount() {
    const res = await BookModel.getMyBookCount()
    this.setData({
      bookCount: res.count
    })
  },

  userAuthorized() {
    promisic(wx.getSetting)()
        .then(data => {
          if (data.authSetting['scope.userInfo']) {
            return promisic(wx.getUserInfo)()
          }
          return false
        })
        .then(data => {
          if (!data) return
          this.setData({
            authorized: true,
            userInfo: data.userInfo
          })
        })
  },


  // userAuthorized() {
  //   wx.getSetting({
  //     success: data => {
  //       if (data.authSetting['scope.userInfo']) {
  //         wx.getUserInfo({
  //           success: data => {
  //             this.setData({
  //               authorized: true,
  //               userInfo: data.userInfo
  //             })
  //           }
  //         })
  //       }
  //     }
  //   })
  // },



  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },

  onJumpToDetail(event){
    const cid = event.detail.cid
    const type = event.detail.type
    // wx.navigateTo
    wx.navigateTo({
      url:`/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
    })
  }


})
