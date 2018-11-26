
wx.cloud.init()
const db = wx.cloud.database()

Page({

  
 onSearch:function(options){
   console.log(options.detail.value)
   var re = new RegExp( options.detail.value);
  console.log(re);
    
   //原生 JavaScript 对象
   db.collection('items').where({
     name: re
   }).get().then(res =>{
     console.log(res)
     this.setData({
       search:res.data
     })
   })
 }
});
