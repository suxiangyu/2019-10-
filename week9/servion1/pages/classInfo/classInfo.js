// pages/classInfo/classInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'默认的title',
    img:'http://www.zhufengpeixun.cn/videoCourse/images/video_html.png',
    count: app.globalData.goodsList.length,
    obj:{}
  },
  add(){
    let arr = app.globalData.goodsList;
    let t = arr.find((item) => item.id == this.data.obj.id)
    if(t){
      t.count++
    }else{
      this.data.obj.count = 1;
      app.globalData.goodsList.push(this.data.obj);
      this.setData({
        count: app.globalData.goodsList.length
      })
    }
  
  },
  touser(){
    wx.switchTab({
      url: '../user/user',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title:options.til,
      img:options.img,
      obj:options,
      count: app.globalData.goodsList.length
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {

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

  }
})