$(function () {
  // 1. 初始化图片裁剪器
  const $image = $('#image')

  // 2. 裁剪选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)

  //   创建layer
  const layer = layui.layer
  //   监听是否上传图片
  $('#btnChooseImage').on('click', function () {
    $('#file').click()
  })
  //   监听file的change事件
  $('#file').on('change', function (e) {
    const fileList = e.target.files
    // const fileList = this.files
    if (fileList.length === 0) return layer.msg('请先上传图片')

    // 新图片地址
    const newImgUrl = URL.createObjectURL(fileList[0])
    // 地址给img
    $image.cropper('destroy').prop('src', newImgUrl).cropper(options)
  })

  //   将裁剪后的图片 传到服务器
  $('#btnUpload').on('click', function () {
    // 裁剪+转换
    // 用户裁剪之后的头像,转化为 `base64` 格式的字符串
    var dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')

    // 发起请求
    $.ajax({
      type: 'POST',
      url: '/my/update/avatar',
      data: { avatar: dataURL },
      success(res) {
        if (res.status !== 0) return layer.msg('上传图片失败')
        layer.msg('图片上传成功')
        // 首页重新发起请求  获得信息
        window.parent.getUserMsg()
      }
    })
  })
})
