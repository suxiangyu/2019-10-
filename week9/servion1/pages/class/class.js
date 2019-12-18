// pages/class/class.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    level1: [],
    level2: [],
    level3: []
  },
  getData() {
    // wx.request({
    //   url: 'https://www.easy-mock.com/mock/5df8a10478735c4dfa2026d6/classList',
    //   success: (res) => {
    //     let {
    //       level1,
    //       level2,
    //       level3
    //     } = res.data;
    //     this.setData({
    //       level1: level1,
    //       level2: level2,
    //       level3: level3
    //     })
    //   }
    // })
    let {
      level1,
      level2,
      level3
    } = wx.getStorageSync('classList');
    this.setData({
      level1: level1,
      level2: level2,
      level3: level3
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 500)

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log('到达底部')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})