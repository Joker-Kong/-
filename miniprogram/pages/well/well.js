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
    this.getPromotion();
  },
  /**
   * 获取促销推荐
   */
  getPromotion: function (options){
    console.log(options)
    db.collection('promotion').where({
      class:'精选'
    }).get().then(res =>{
      console.log(res)
    }).catch(console.log)
  }
})