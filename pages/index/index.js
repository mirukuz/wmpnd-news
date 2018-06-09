// pages/index.js/index.js
const moment = require('../../utils/moment.js')

const newsCategoryMap = {
  'gn': '国内',
  'gj': '国际',
  'cj': '财经',
  'yl': '娱乐',
  'js': '军事',
  'ty': '体育',
  'other': '其他'
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: Object.entries(newsCategoryMap),
    category: 'gn',
    list: '',
    id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNewsList()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getNewsList(() => {
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 跳转新闻详情页面
   */
  onTapGetDetail(e) {
    let id = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },

  /**
   * 切换新闻分类，并刷新新闻列表
   */
  onTapGetCategory(e) {
    let category = e.currentTarget.dataset.name
    console.log(category)
    this.setData({
      category: category
    }, () => this.getNewsList())
  },

  /**
   * 获取新闻列表
   */
  getNewsList(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.category
      },
      success: res => {
        let list = res.data.result
        // 格式化时间为 `时:分`
        list.forEach(item => {
          item.date = moment.getHourAndMinutes(item.date);
        });
        this.setData({
          list: list
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  },
})