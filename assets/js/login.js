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
})
