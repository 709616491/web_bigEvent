$(function () {
  const form = layui.form
  const layer = layui.layer
  // 检验密码
  form.verify({
    pwd: [/^[\S]{6,12}$/, '请输入6-12位密码,且不能位空格'],
    newPwd: function (value) {
      if (value === $('[name=oldPwd]').val()) return '新旧密码不能相同'
    },
    surePwd: function (value) {
      if (value !== $('[name=newPwd]').val()) return '两次输入密码不一致'
    }
  })

  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success(res) {
        console.log(res)
        if (res.status !== 0) return layer.msg('失败')
        layer.msg('密码修改成功！')
        // 清空form表单信息
        $('.layui-form')[0].reset()
      }
    })
  })
})
