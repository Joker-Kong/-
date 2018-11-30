function imageLoad(e, zhi, img, or) {
  var windowWidth = 0;
  wx.getSystemInfo({
    success: function (res) {
      windowWidth = res.windowWidth;
    }
  })
  var $width = e.detail.width,    //获取图片真实宽度
    $height = e.detail.height,   //获取图片的真实高度
    ratio = $width / $height;   //图片的真实宽高比例
  if (or == 'height') {
    var viewWidth = zhi * ratio,           //设置图片显示宽度
      viewHeight = zhi;
  } else {
    var viewWidth = zhi,           //设置图片显示宽度
      viewHeight = zhi / ratio;
  }
  var image = img;
  //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
  image[e.target.dataset.index] = {
    width: viewWidth,
    height: viewHeight
  }
  return image;
}
module.exports = {
  imageLoad: imageLoad
}