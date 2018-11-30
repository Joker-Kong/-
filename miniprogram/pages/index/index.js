
const db = wx.cloud.database();
const app = getApp()

let goodsList = [
  { actEndTime: '2019/12/31 12:00:43' }
]
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    countDownList: [],
    actEndTimeList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.recommend();
    this.getRecommend();
    this.getTimeBuy();
    let endTimeList = [];
    // 将活动的结束时间参数提成一个单独的数组，方便操作
    goodsList.forEach(o => { endTimeList.push(o.actEndTime) })
    this.setData({ actEndTimeList: endTimeList });
    // 执行倒计时函数
    this.countDown();
  },
  /**
   * 掌上抢
   */
  getTimeBuy:function(){
    db.collection('images').where({
      sign:'掌上抢'
    }).get().then(res =>{
      console.log(res)
    })
  },
  /**
   * 推荐榜商品
   */
  getRecommend:function(){
    db.collection('recommend').get().then(res =>{
      this.setData({
        recommend:res.data
      })
    }).catch(console.log)
  },
  timeFormat(param) {//小于10的格式化函数
    return param < 10 ? '0' + param : param;
  },
  /**
   * 倒计时函数
   */
  countDown(){
    // 获取当前时间，同时得到活动结束时间数组
    let newTime = new Date().getTime() || new Date(date.replace(/-/g, '/')).getTime();
    let endTimeList = this.data.actEndTimeList;
    let countDownArr = [];
    // 对结束时间进行处理渲染到页面
    endTimeList.forEach(o => {
      let endTime = new Date(o).getTime();
      let obj = null;
      // 如果活动未结束，对时间进行处理
      if (endTime - newTime > 0) {
        let time = (endTime - newTime) / 1000;
        // 获取天、时、分、秒
        let hou = parseInt(time % (60 * 60 * 24) / 3600);
        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
        obj = {
          hou: this.timeFormat(hou),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)
        }
      } else {//活动已结束，全部设置为'00'
        obj = {
          // day: '00',
          hou: '00',
          min: '00',
          sec: '00'
        }
      }
      countDownArr.push(obj);
    })
    // 渲染，然后每隔一秒执行一次倒计时函数
    this.setData({ countDownList: countDownArr })
    setTimeout(this.countDown, 1000);
  },
  /**
   * 热销推荐
   */
  recommend:function(){
    db.collection('items').where({
      recommend:true
    }).get().then(res =>{
      console.log(res.data)
      this.setData({
        images:res.data
      })
    }).catch(erro =>{
      
    })
  },
  
    /**
   * 获取用户信息
   */
    onGotUserInfo: function(event) {
      db.collection('userInfo').where({
        _openid: app.globalData.openId
      }).count().then(res => {
          if (res.total <= 0) {
            db.collection('userInfo').add({
              data: {
                nickName: event.detail.userInfo.nickName,
                gender: event.detail.userInfo.gender,
                city: event.detail.userInfo.city,
                province: event.detail.userInfo.province,
                country: event.detail.userInfo.country,
                language: event.detail.userInfo.language,
                avatarUrl: event.detail.userInfo.avatarUrl,
                isNewUser: false,
                coupon: 20
              }
            }).then(res => {
              wx.showToast({
                title: '领取成功！',
              })
            }).catch(console.error)
          } else {
            wx.showToast({
              title: '您已领取过了',
            })
          }
        }).catch(console.error)
  },
  /**
   * 添加到购物车
   */
  addShoppingCart: function(options){
    console.log(options.target.id)
    db.collection('shoppingCart').where({
      _openid: app.globalData.openId,
      itemId: options.target.id
    }).count().then(res =>{
      console.log(res.total)
      if(res.total<=0){
        db.collection('shoppingCart').add({
          data: {
            itemId: options.target.id,
            firstPictrue: options.target.dataset.image,
            price: options.target.dataset.price
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
      }else{
        wx.showToast({
          title: '已经在购物车了',
          icon: 'fail',
          duration: 2000
        })
      }
    })

   
  },                                    
  /**
   * 跳转搜索页面
   */
  onSearch() {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  handleClick(e){
    
  var index= e.currentTarget.dataset.id
  },
  onShareAppMessage: function () {
    return {
      title: '婷美小屋',
      desc: '属于您的化妆品商城!'
    }
  }  
})


