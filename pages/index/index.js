import {Classic} from "../../model/classic";

Page({
  async getLatest(){
      const data = await Classic.getLatest()
      console.log(data)
  }
})
