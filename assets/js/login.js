$(function () {
  // 点击‘去注册页面’隐藏登录显示注册
  $('.go_reg').on('click', function () {
    $('.reg_box').show()
    $('.login_box').hide()
  })
  //   点击“去登录”隐藏注册显示登录
  $('.go_login').on('click', function () {
    $('.reg_box').hide()
    $('.login_box').show()
  })

  //   自定义layui表单form中input校验
  const form = layui.form
  //   layui中的layer弹框对象
  const layer = layui.layer
  form.verify({
    //   数组前面为判断的条件，后面是不符合条件的返回值
    pwd: [/^[\S]{6,12}$/, '请输入6-12位非空字符'],
    // pwd: function (value) {
    //   const regPwd = /^[\S]{6,12}$/
    //   if (!regPwd.test(value)) return '请输入6-12位非空字符'
    // },
    repwd: function (value) {
      if ($('.reg_box [name=password]').val() !== value) return '两次密码输入不一致'
    }
  })

  //   注册提交发送ajax
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    const data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.ajax({
      type: 'POST',
      url: 'http://ajax.frontend.itheima.net/api/reguser',
      data,
      success(res) {
        if (res.status !== 0) return layer.msg(res.message)
        // 弹框信息
        layer.msg(res.message)
        // 跳转到登录
        $('.go_login').click()
      }
    })
  })
  //   登录
  $('#form_login').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: 'http://ajax.frontend.itheima.net/api/login',
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg('登录成功！')
        // 获取令牌 Authorization
        localStorage.setItem('token', res.token)
        // 跳转页面主页
        location.href = '/index.html'
      }
    })
  })
})
