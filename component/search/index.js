import {KeywordModel} from "../../model/keyword";
import {BookModel} from "../../model/bookModel";
import {paginationBev} from "../behaviors/pagination";

const keywordModel = new KeywordModel()

Component({
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loading: false,
    loadingCenter: false
  },

  async attached() {
    this.setData({
      historyWords: keywordModel.getHistory()
    })
    const res = await keywordModel.getHot()
    this.setData({
      hotWords: res.hot
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async loadMore() {
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        this.locked()
        try{
          const res = BookModel.search(this.getCurrentStart(), this.data.q)
          this.setMoreData(res.books)
          this.unLocked()
        }catch (e) {
          this.unLocked()
        }
      }
    },


    onCancel(event) {
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },

    onDelete(event) {
      this.initialize()
      this._closeResult()
    },

    async onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      // this.initialize()
      const q = event.detail.value || event.detail.text
      this.setData({
        q
      })
      const res = await BookModel.search(0, q)
      this.setMoreData(res.books)
      this.setTotal(res.total)
      keywordModel.addToHistory(q)
      this._hideLoadingCenter()

    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    }

  }
})
