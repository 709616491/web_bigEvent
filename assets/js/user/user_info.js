$(function () {
  const form = layui.form
  const layer = layui.layer
  //   自定义layui表单验证
  form.verify({
    nickname: function (value) {
      if (value.length > 6) return '昵称长度为1-6位'
    }
  })

  initUserMsg()
  //从服务器获取信息
  function initUserMsg() {
    $.ajax({
      type: 'GET',
      url: '/my/userinfo',
      success(res) {
        if (res.status !== 0) return layer.msg('信息获取失败')
        // 渲染  给所有表单元素赋值
        form.val('formUserInfo', res.data)
      }
    })
  }

  //   重置 重新从服务器调数据
  $('#btnReset').on('click', function (e) {
    e.preventDefault()
    initUserMsg()
  })

  //   修改后监听提交
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) return layer.msg('提交失败')
        layer.msg('修改信息成功！')
        // 修改父页面的头像和name信息
        window.parent.getUserMsg()
      }
    })
  })
})
