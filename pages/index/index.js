//index.js
//获取应用实例
const app = getApp()
var animation1;
var animation2;
var animation3;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: ['../images/土豆1.jpg', '../images/土豆2.jpg', '../images/土豆3.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    sourceCity: '北京',
    destCity: '上海',
    images: []
  },
 

 onReady: function () {
  animation1 = wx.createAnimation({
   duration: 300,
   timingFunction: 'linear',
   transformOrigin: "50%,50%"
  })

  animation2 = wx.createAnimation({
   duration: 300,
   timingFunction: 'linear'
  })

  animation3 = wx.createAnimation({
   duration: 300,
   timingFunction: 'linear'
  })
 },
 rotate: function () {
  animation1.rotate(180).step()

  this.setData({
   animationData: animation1.export()
  })

  var that = this;
  setTimeout(function () {
   animation1.rotate(0).step({ duration: 0, transformOrigin: "50%,50%", timingFunction: 'linear' })
   that.setData({
    animationData: animation1.export()
   })
  }, 300)

  animation2.left('600rpx').step()
  this.setData({
   animationSourceCity: animation2.export()
  })

  setTimeout(function () {
   animation2.left('30rpx').step({ duration: 0, transformOrigin: "50%,50%", timingFunction: 'linear' })
   that.setData({
    animationSourceCity: animation2.export()
   })
  }, 285)

  animation3.right('580rpx').step()
  this.setData({
   animationDestCity: animation3.export()
  })

  setTimeout(function () {
   animation3.right('30rpx').step({ duration: 0, transformOrigin: "50%,50%", timingFunction: 'linear' })
   that.setData({
    animationDestCity: animation3.export()
   })
  }, 285)
 },
chooseImage(e) {
  wx.chooseImage({
   sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
   sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
   success: res => {
    
    const images = this.data.images.concat(res.tempFilePaths);
    console.log(images)
    // 限制最多只能留下3张照片
    this.data.images = images.length <= 3 ? images : images.slice(0, 3)
    // $digest(this)
   }
  })

 },
 removeImage(e) {
  const idx = e.target.dataset.idx
  this.data.images.splice(idx, 1)
  // $digest(this)
 },

 handleImagePreview(e) {
  const idx = e.target.dataset.idx
  const images = this.data.images
  wx.previewImage({
   current: images[idx],  //当前预览的图片
   urls: images,  //所有要预览的图片
  })
 }
})