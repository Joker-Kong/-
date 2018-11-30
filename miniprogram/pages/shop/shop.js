const db = wx.cloud.database();
const app = getApp()
var numbers = 1;
var bool = true;
Page({

  data: {
    show_edit: "block",
    edit_name: "编辑",
    edit_show: "none",
    // list: [],               // 购物车列表
    // hasList: false,          // 列表是否有数据
    // 默认展示数据
    hasList: true,
    // 商品列表数据
    // list: [{
    //   id: 1,
    //   title: '园艺大师抗皱精华露',
    //   image: '../../img/a1.jpg',
    //   pro_name: "30ml",
    //   num: 1,
    //   price: 180,
    //   selected: true
    // },
    // {
    //   id: 2,
    //   title: '伊芙琳玫瑰护手霜',
    //   image: '../../img/a1.jpg',
    //   pro_name: "25g",
    //   num: 1,
    //   price: 62,
    //   selected: true
    // },
    // {
    //   id: 2,
    //   title: '燕麦山羊乳舒缓护手霜',
    //   image: '../../img/a1.jpg',
    //   pro_name: "75ml",
    //   num: 1,
    //   price: 175,
    //   selected: true
    // }
    // ],
    // 全选状态
    selectAllStatus: true, // 全选状态，默认全选
  },

  onLoad: function(parameter) {
    console.log(parameter)
     db.collection('shoppingCart').where({
      _openid: app.globalData.openId
    }).get().then(res => {
      console.log(res)
      this.setData({
        list:res.data
      })
      db.collection()
    })
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
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let list = this.data.list;                    // 获取购物车列表
    const selected = list[index].selected;         // 获取当前商品的选中状态
    list[index].selected = !selected;              // 改变状态
    this.setData({
      list: list
    });
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
          // 如果数据为空
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
      list[i].selected = selectAllStatus;
    }
    // 页面重新渲染
    this.setData({
      selectAllStatus: selectAllStatus,
      list: list
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