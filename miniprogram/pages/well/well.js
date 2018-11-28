// pages/well/well.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPromotion(options);
  },
  /**
   * 获取促销推荐
   */
  getPromotion: function (options){
    console.log(options.key)
    db.collection('promotion').where({
      class:options.key
    }).get().then(res =>{
      this.setData({
        list:res.data
      })
    }).catch(console.log)
  }
})