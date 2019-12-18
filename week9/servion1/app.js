//app.js
App({
  onLaunch: function (res) {
    // console.log(res)
    // 展示本地存储能力
    wx.setStorage({
      key: 'banner',
      data: ["http://www.zhufengpeixun.cn/main/img/banner01.png",
        "http://www.zhufengpeixun.cn/main/img/banner02.png",
        "http://www.zhufengpeixun.cn/main/img/banner03.png"],
    })
    wx.setStorage({
      key: 'classList',
      data: {
        "level1": [
          {
            "img": "http://www.zhufengpeixun.cn/videoCourse/images/video_html.png",
            "title": "珠峰HTML+CSS精讲视频",
            "price": 0,
            "count": 156,
            "id": 1
          },
          {
            "img": "http://www.zhufengpeixun.cn/videoCourse/images/video_h5.png",
            "title": "HTML5+CSS3精讲视频",
            "price": 0,
            "count": 156,
            "id": 2
          },
          {
            "img": "http://www.zhufengpeixun.cn/videoCourse/images/html5.jpg",
            "title": "HTML5实战 - webApp开发视频",
            "price": 0,
            "count": 156,
            "id": 3
          },
          {
            "img": "http://www.zhufengpeixun.cn/videoCourse/images/video_js.png",
            "title": "JavaScript基础视频",
            "price": 0,
            "count": 156,
            "id": 4
          }
        ],
        "level2": [
          {
            "img": "http://pic3.ablesky.cn/content/pic/coursephoto/2017/12/08/643a5e6e-58a4-41b4-bfd0-b9d2cd87ac3d.jpg",
            "title": "2017年前端全栈工程化开发视频",
            "price": 0,
            "count": 156,
            "id": 5
          },
          {
            "img": "http://www.zhufengpeixun.cn/videoCourse/images/es6.jpg",
            "title": "珠峰名师带你玩转ES6",
            "price": 0,
            "count": 156,
            "id": 6
          },
          {
            "img": "http://www.zhufengpeixun.cn/videoCourse/images/jquery.jpg",
            "title": "JQUERY源码解读和实战应用",
            "price": 0,
            "count": 156,
            "id": 7
          },
          {
            "img": "http://www.zhufengpeixun.cn/videoCourse/images/ajax.jpg",
            "title": "珠峰Ajax原理系列视频",
            "price": 0,
            "count": 156,
            "id": 8
          },
          {
            "img": "http://www.zhufengpeixun.cn/videoCourse/images/js.jpg",
            "title": "珠峰web前端-闭包精讲视频",
            "price": 0,
            "count": 156,
            "id": 9
          },
          {
            "img": "http://www.zhufengpeixun.cn/videoCourse/images/js_dx.jpg",
            "title": "珠峰web前端-面向对象视频",
            "price": 0,
            "count": 156,
            "id": 10
          },
          {
            "img": "http://www.zhufengpeixun.cn/videoCourse/images/reg.jpg",
            "title": "珠峰web前端-正则实战视频",
            "price": 0,
            "count": 156,
            "id": 11
          }
        ],
        "level3": [
          {
            "img": "http://www.zhufengpeixun.cn/videoCourse/images/video_node.png",
            "title": "Node.js基础入门视频",
            "price": 0,
            "count": 156,
            "id": 12
          },
          {
            "img": "http://www.zhufengpeixun.cn/videoCourse/images/new5.png",
            "title": "Vue从理论到项目实战精讲视频",
            "price": 0,
            "count": 156,
            "id": 13
          },
          {
            "img": "http://www.zhufengpeixun.cn/videoCourse/images/new1.png",
            "title": "微信小程序专家级课程",
            "price": 0,
            "count": 156,
            "id": 14
          },
          {
            "img": "http://www.zhufengpeixun.cn/videoCourse/images/new6.png",
            "title": "React架构视频课程",
            "price": 0,
            "count": 156,
            "id": 15
          }
        ]
      },
    })
    wx.setStorage({
      key: 'publicList',
      data: [
        {
          "img": "http://www.zhufengpeixun.cn/public/imgs/vuerouter.png",
          "text": "手写vue路由"
        },
        {
          "img": "http://www.zhufengpeixun.cn/skin/20142/img/g4.jpg",
          "text": "九种跨域方式全揭秘,再也不担心跨域问题了"
        },
        {
          "img": "http://www.zhufengpeixun.cn/skin/20142/img/g3.jpg",
          "text": "MVVM原理剖析:数据劫持，观察者模式,模版编译 "
        },
        {
          "img": "http://www.zhufengpeixun.cn/skin/20142/img/g2.jpg",
          "text": "实现React虚拟DOM和DOM Diff"
        }
      ],
    })
    // console.log(logs)
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // wx.getStorageInfo({
    //   success: function(res) {
    //     console.log(res)  
    //   },
    // })
    // wx.getSystemInfo({
    //   success: function(res) {
    //     console.log(res)
    //   },
    // })

    // 登录
    // wx.login({
    //   success: res => {
    //     console.log(res)
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    wx.getUserInfo({
      success(res) {
        // console.log(res)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    goodsList: []
  }
})