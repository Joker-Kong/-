Page({
  data: {
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    nums:0  
  },
  onLoad(option){
    var carts = JSON.parse(option.carts)
      this.setData({
        carts
      })
  },
  onShow() { 
    this.setData({
      hasList: true      // 既然有数据了，那设为true吧
    });
    this.getTotalPrice()
  },

  // 计算总价
  getTotalPrice() {
    let carts = this.data.carts; 
    // console.log(carts)                 // 获取购物车列表
    let total = 0;
    let nums=0
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
                         // 判断选中才会计算价格
        total += carts[i].num * carts[i].price;     // 所有价格加起来
      nums += carts[i].num
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts,
      totalPrice: total.toFixed(2),
      nums
    });
  },
  // 增加数量
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  // 减少数量
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index, 1);              // 删除购物车列表里这个商品
    this.setData({
      carts: carts
    });
    if (!carts.length) {                  // 如果购物车为空
      this.setData({
        hasList: false              // 修改标识为false，显示购物车为空页面
      });
    } else {                              // 如果不为空
      this.getTotalPrice();           // 重新计算总价格
    }
  }
  
})