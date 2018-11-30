const db = wx.cloud.database();
Page({
  data: {
    state:0,
    typeData: [],
    contentActive: '1', // 内容栏选中id
    navActive: '', // 导航栏选中id
    heightArr: [],
    containerH: 0,
    id:0,
    classList:[]
  },
  onLoad: function (options) {
    this.getClassify();
  },
  onShow:function(){
    console.log(123)
  },
  /**
   * 获取分类
   */
  getClassify:function(){
    db.collection('classify').get().then(res => {
      console.log(res)
      this.setData({
        classList:res.data
      })
    })
    //初加载
    db.collection('items').where({
      classify: '护肤'
    }).get().then(res => {
      console.log(res)
      this.setData({
        flcp: res.data
      })
    })
    
  },
  /**
   * 获取各分类产品
   */
  chooseClassify:function(parameter){
    var id = parameter.target.dataset.id
     db.collection('items').where({
       classify: parameter.target.dataset.key
     }).get().then(res =>{
       console.log(res)
        this.setData({
          id,
          flcp:res.data
        })
     })
  }
})

