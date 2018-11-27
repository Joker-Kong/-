// pages/details/details.js
wx.cloud.init()
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
    db.collection('items').where({
      _id: options.id
    }).get().then(res => {
      console.log(res)
      this.setData({
        images: res.data[0].images
      })
    })
  },
})