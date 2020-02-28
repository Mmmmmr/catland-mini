import {ClassicModel} from "../../model/classicModel";
import {LikeModel} from "../../model/likeModel";

Page({

  data: {
    classic: null,
    latest: true,
    first: false
  },

  onLoad: async function (options) {
    const res = await ClassicModel.getLatest()
    this.setData({
      classic: res
    })
  },

  onLike:async function(event){
    let behavior = event.detail.behavior
    console.log(behavior)
    await LikeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },

   onNext(){
     this._updateClassic('next')
  },

   onPrevious(){
     this._updateClassic('previous')
  },

  async _updateClassic(nextOrPrevious){
    let index = this.data.classic.index
    let res = await ClassicModel.getClassic(index, nextOrPrevious)
    this.setData({
      classic: res,
      latest: ClassicModel.isLatest(res.index),
      first: ClassicModel.isFirst(res.index)
    })
  }
})
