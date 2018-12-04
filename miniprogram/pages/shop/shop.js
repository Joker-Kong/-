const db = wx.cloud.database();
const app = getApp()
var numbers = 1;
var bool = true;
Page({

  data: {
    show_edit: "block",
    list: [],               // 购物车列表
     hasList: true,          // 列表是否有数据
    // 全选状态
    selectAllStatus: true // 全选状态，默认全选
  },

  onLoad: function(parameter) {
    this.getShopping();
  },
  /**
   * 加载购物车
   */
  getShopping:function(){
    db.collection('shoppingCart').where({
      _openid: app.globalData.openId
    }).get().then(res => {
      this.setData({
        list:res.data
      })
    })
   
  },
  getOrder() {
    // 初始化toastStr字符串
    var toastStr = [];
    // 遍历取出已勾选的cid
    for (var i = 0; i < this.data.list.length; i++) {
      if (this.data.list[i].isSelect) {
        toastStr.push(this.data.list[i])
      }
    }  
    //存回data
    this.setData({
      toastStr
    });
    wx.navigateTo({
       url: '../order/order?carts=' + JSON.stringify(toastStr)
    })
  },
  /**
   * 删除购物车收藏
   */
  deleteShoppingItem:function(parameter){
    console.log(parameter.target.id)
    db.collection('shoppingCart').doc(parameter.target.id).remove()
      .then(
        wx.showToast({
        title: '移除成功',
        })
      )
      .catch(
      wx.showToast({
        title: '移除失败',
      })       
      )
  },
  onShow() {
    wx.showToast({
      title: '加载中',
      icon: "loading",
      duration: 1000
    })

  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;   // 获取data- 传进来的index
    let list = this.data.list;                    // 获取购物车列表
    const isSelect = list[index].isSelect;         // 获取当前商品的选中状态
    list[index].isSelect = !isSelect;              // 改变状态
    this.setData({
      list
    });

    // 重新渲染数据
    this.setData({
      list: list,
      selectAllStatus: this.data.selectAllStatus
    })
  },
  // 删除
  deletes: function (e) {
    var that = this;
    // 获取索引
    const index = e.currentTarget.dataset.index;
    // 获取商品列表数据
    let list = this.data.list;
    wx.showModal({
      title: '提示',
      content: '确认删除吗',
      success: function (res) {
        if (res.confirm) {
          // 删除索引从1
          list.splice(index, 1);
          // 页面渲染数据
          that.setData({
            list: list
          });
        } 
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  /**
   * 购物车全选事件
   */
  selectAll(e) {
    // 全选ICON默认选中
    let selectAllStatus = this.data.selectAllStatus;
    // true  -----   false
    selectAllStatus = !selectAllStatus;
    
    // 获取商品数据
    let list = this.data.list;
    // 循环遍历判断列表中的数据是否选中
    for (let i = 0; i < list.length; i++) {
      list[i].isSelect = selectAllStatus;
    }
    // 页面重新渲染
    this.setData({
      selectAllStatus,
      list
    });
  },
  // 收藏
  btn_collert: function () {
    wx.showToast({
      title: '收藏暂未开发',
      duration: 2000
    })
  }
})