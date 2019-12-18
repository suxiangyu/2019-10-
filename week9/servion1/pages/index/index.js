//index.js
//获取应用实例
const app = getApp()

Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  onLoad: function (options) {
    // wx.request({
    //   url: 'https://www.easy-mock.com/mock/5df8a10478735c4dfa2026d6/banner',
    //   // url:'../../json/banner.json',
    //   success: (res) => {
    //     this.setData({
    //       bannerList: res.data.list
    //     })
    //   }
    // })
    this.setData({
      bannerList: wx.getStorageSync('banner')
    })
    this.getPublic()
  },

  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    bannerList: [],
    publicList: [],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    knowFlag: false,
    knowFlag2: false
  },
  getPublic() {
    // wx.request({
    //   url: 'https://www.easy-mock.com/mock/5df8a10478735c4dfa2026d6/publicList',
    //   success: (res) => {
    //     this.setData({
    //       publicList: res.data
    //     })
    //   }
    // })
    this.setData({
      publicList: wx.getStorageSync('publicList')
    })
    console.log(this.data.publicList)
  },
  close() {
    this.setData({
      knowFlag: false
    })
  },
  close2() {
    this.setData({
      knowFlag2: false
    })
  },
  showDia() {
    this.setData({
      knowFlag: true
    })
  },
  showDia2() {
    this.setData({
      knowFlag2: true
    })
  },
  canplay(e) {
    console.log(e)
  }
})