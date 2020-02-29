import {ClassicModel} from "../../model/classicModel";
import {LikeModel} from "../../model/likeModel";

Page({

  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  onLoad: async function (options) {
    const res = await ClassicModel.getLatest()
    this.setData({
      classic: res,
      likeCount: res.fav_nums,
      likeStatus: res.like_status
    })
  },

  onLike:async function(event){
    let behavior = event.detail.behavior
    await LikeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },

   onNext(){
     this._updateClassic('next')
  },

   onPrevious(){
     this._updateClassic('previous')
  },

  async _getLikeStatus(artID, category){
    const res = await LikeModel.getClassicStatus(artID, category)
    this.setData({
      likeCount: res.fav_nums,
      likeStatus: res.likeStatus
    })

  },

  async _updateClassic(nextOrPrevious){
    let index = this.data.classic.index
    let res = await ClassicModel.getClassic(index, nextOrPrevious)
    this._getLikeStatus(res.id, res.type)
    this.setData({
      classic: res,
      latest: ClassicModel.isLatest(res.index),
      first: ClassicModel.isFirst(res.index)
    })
  }

})
