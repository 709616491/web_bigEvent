$(function () {
  // 注意layui的引入
  const layer = layui.layer
  const form = layui.form

  // 1. 初始化图片裁剪器
  const $image = $('#image')

  // 2. 裁剪选项
  const options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)

  // 初始化富文本编辑器
  initEditor()

  //   以上均为引用插件
  //   初始化文章分类
  initCate()

  //  打开页面的时候就初始化不需要注册事件 初始化文章分类
  function initCate() {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success(res) {
        if (res.status !== 0) return layer.msg('文章分类获取失败')
        const htmlStr = template('tpl-cate', res)
        // 属性选择器的[]不能省略
        $('[name="cate_id"]').html(htmlStr)
        // 重新加载
        form.render()
      }
    })
  }

  //   选择封面
  $('#btnChooseImage').on('click', function () {
    $('#coverFile').click()
  })
  //   监听file的change事件
  $('#coverFile').on('change', function () {
    const file = this.files
    if (file.length <= 0) return
    const imgURL = URL.createObjectURL(file[0])
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', imgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })

  //   设置接口所需要的状态
  let state = '已发布'
  //   点击存草稿则改变state
  $('#btnSave2').on('click', function () {
    state = '草稿'
  })

  //   发起提交请求
  $('#form-pub').on('submit', function (e) {
    e.preventDefault()
    // 获取标题、分类、内容
    const fd = new FormData(this)
    // 添加状态
    fd.append('state', state)
    // 添加图片
    $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        fd.append('cover_img', blob)
        sendArt(fd)
      })
  })

  //   发布文章
  function sendArt(fd) {
    //   发送请求
    $.ajax({
      type: 'POST',
      url: '/my/article/add',
      // 注意：如果向服务器提交的是 FormData 格式的数据，
      // 必须添加以下两个配置项
      contentType: false,
      processData: false,
      data: fd,
      success(res) {
        if (res.status !== 0) return layer.msg('文章存储失败')
        layer.msg('文章存储成功')
        window.parent.document.querySelector('[href="/home/article/article_list.html"]').click()
      }
    })
  }
})
