
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  addData:function(){
    db.collection('items').add({
      data:{
        brand: 'TIMIER HOUSE/婷美小屋',
        itemName: '玩美无暇BB霜',
        price: 169.00,
        describe: '持久保湿遮瑕不脱妆隔离BB霜自然裸妆控油底妆轻薄透气提亮肤色',
        effect: '遮瑕 提亮肤色',
        stock: 1000,
        firstPictrue: 'cloud://test-a9be2a.7465-test-a9be2a/彩妆/玩美BB霜/首图.jpg',
        rcommend:true,
        images: [
          'cloud://test-a9be2a.7465-test-a9be2a/彩妆/玩美BB霜/玩美无瑕BB霜女2.jpg',
          'cloud://test-a9be2a.7465-test-a9be2a/彩妆/玩美BB霜/玩美无瑕BB霜女3.jpg',
          'cloud://test-a9be2a.7465-test-a9be2a/彩妆/玩美BB霜/玩美无瑕BB霜女5.jpg',
          'cloud://test-a9be2a.7465-test-a9be2a/彩妆/玩美BB霜/玩美无瑕BB霜女6.jpg',
          'cloud://test-a9be2a.7465-test-a9be2a/彩妆/玩美BB霜/玩美无瑕BB霜女7.jpg',
          'cloud://test-a9be2a.7465-test-a9be2a/彩妆/玩美BB霜/玩美无瑕BB霜女8.jpg',
          'cloud://test-a9be2a.7465-test-a9be2a/彩妆/玩美BB霜/玩美无瑕BB霜女10.jpg',
          'cloud://test-a9be2a.7465-test-a9be2a/彩妆/玩美BB霜/玩美无瑕BB霜女12.jpg']
      }
    }).then(res =>{
      console.log(res)
    })
  },

  addData1: function () {
    db.collection('promotion').add({
      data:{
        class:'精选',
        itemName: '气色满满腮红乳',
        price: 139.00,
        firstPictrue: 'cloud://test-a9be2a.7465-test-a9be2a/促销/3.jpg'
        }
    }).then(res => {
      console.log(res)
    })
  },
  addData2: function () {
    db.collection('promotion').add({
      data: {
        class: '热销',
        itemName: '气色满满腮红乳',
        price: 139.00,
        firstPictrue: 'cloud://test-a9be2a.7465-test-a9be2a/促销/3.jpg'
      }
    }).then(res => {
      console.log(res)
    })
  },
  addData3: function () {
    db.collection('promotion').add({
      data: {
        class: '必买',
        itemName: '绿茶籽洗面奶',
        price: 49.00,
        firstPictrue: 'cloud://test-a9be2a.7465-test-a9be2a/促销/绿茶籽面膜首页.jpg'
      }
    }).then(res => {
      console.log(res)
    })
  },
  addData4: function () {
    db.collection('promotion').add({
      data: {
        class: '印象',
        itemName: '保湿修颜隔离霜',
        price: 139.00,
        firstPictrue: 'cloud://test-a9be2a.7465-test-a9be2a/促销/保湿修颜隔离霜.jpg'
      }
    }).then(res => {
      console.log(res)
    })
  },
  addData5: function () {
    db.collection('recommend').add({
      data: {
        key: '必买',
        name: '进店必买',
        firstPictrue: 'cloud://test-a9be2a.7465-test-a9be2a/首页/进店必买.jpg'
      }
    }).then(res => {
      console.log(res)
    })
  }
 

})