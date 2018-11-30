const db = wx.cloud.database();
const app = getApp()
Page({

  data: {

  },

  onLoad: function(parameter) {
    console.log(parameter)
     db.collection('shoppingCart').where({
      _openid: app.globalData.openId
    }).get().then(res => {
      console.log(res)
      db.collection()
    })
  }

})