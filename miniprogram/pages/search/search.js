
wx.cloud.init()
const db = wx.cloud.database()

Page({

 onSearch:function(options){
   console.log(options)
   var re = new RegExp( options.detail.value);
   //原生 JavaScript 对象
   db.collection('items').where({
     itemName: re
   }).get().then(res =>{
     console.log(res.data[0].images)
     this.setData({
       itemName: res.data[0].itemName,
       id:res.data[0]._id
     })
   })
 }

});
