// components/dialog/dialog.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    // styleIsolation: 'apply-shared'
  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    fn(e){
      this.triggerEvent('close', false)
    },
    stop(){

    }
  }
})
