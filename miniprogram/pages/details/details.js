// pages/details/details.js
wx.cloud.init()
const db = wx.cloud.database();
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:[],
    showPop: false,
    animationData: {},
    firstImg:[],
    lists:[]
  },
  // 显示底部弹层
  showModal: function () {
    var _this = this;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
      delay: 0
    })
    _this.animation = animation
    animation.translateY(300).step()
    _this.setData({
      animationData: animation.export(),
      showPop: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      _this.setData({
        animationData: animation.export()
      })
    }.bind(_this), 50)
  },
  // 隐藏底部弹层
  hideModal: function () {
    var _this = this;
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    _this.animation = animation
    animation.translateY(300).step()
    _this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      _this.setData({
        animationData: animation.export(),
        showPop: false
      })
    }.bind(this), 200)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('items').where({
      _id: options.id
    }).get().then(res => {
      this.setData({
        images: res.data[0].images,
        firstImg: res.data[0].firstPictrue,
        lists: res.data[0]
      })
    })
  },
  addShoppingCart: function (options) {
   
    db.collection('shoppingCart').where({
      _openid: app.globalData.openId,
      itemId: this.data.lists._id
    }).count().then(res => {
      if (res.total <= 0) {
        db.collection('shoppingCart').add({
          data: {
            itemId: this.data.lists._id,
            firstPictrue: this.data.lists.firstPictrue,
            price: this.data.lists.price,
            name:this.data.lists.itemName
          }
        }).then(res => {
          wx.showToast({
            title: '成功添加购物车',
            icon: 'success',
            duration: 2000
          })
        }).catch(error => {
          wx.showToast({
            title: '添加失败',
            icon: 'fail',
            duration: 2000
          })
        })
      } else {
        wx.showToast({
          title: '已经在购物车了',
          icon: 'fail',
          duration: 2000
        })
      }
    })
    var _this = this;
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    _this.animation = animation
    animation.translateY(300).step()
    _this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      _this.setData({
        animationData: animation.export(),
        showPop: false
      })
    }.bind(this), 200)
  },
  goOrder(event) {
    wx.navigateTo({
      url: '../order/order?carts=' + JSON.stringify(this.data.lists)
    })
  }
})