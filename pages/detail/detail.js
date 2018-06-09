// pages/detail/detail.js
const moment = require('../../utils/moment.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    date: "",
    source: "",
    firstImage: "",
    content: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getNewsDetail()
  },

  getNewsDetail(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.id
      },
      success: res => {
        console.log(res.data.result)
        let result = res.data.result
        if (result){
          this.setData({
            title: result.title,
            date: moment.getHourAndMinutes(result.date),
            source: result.source,
            firstImage: result.firstImage,
            content: result.content,
            readCount: result.readCount,
          })
        }
      },
      complete: () => {
        callback && callback()
      }
    })
  },
})