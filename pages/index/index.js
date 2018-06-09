// pages/index.js/index.js
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  onTapGetDetail(e) {
    let id = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },
  onTapGetCategory(e) {
    let category = e.currentTarget.dataset.name
    console.log(category)
    this.setData({
      category: category
    }, () => this.getNewsList())
  },
  // TODO: Move it to /utils
  minutesWithLeadingZeros(dt) {
    return (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
  },
  getHourAndMinutes(e){
    let moment = new Date(e);
    return `${moment.getHours()}:${this.minutesWithLeadingZeros(moment)}`
  },
  getNewsList(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.category
      },
      success: res => {
        let list = res.data.result
        // Format the date to `hour:minute`
        list.forEach(item => {
          item.date = this.getHourAndMinutes(item.date);
        });
        console.log(list)
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