$(function () {
  getUserMsg()
})
// 发送请求获取用户信息
function getUserMsg() {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    headers: { Authorization: localStorage.getItem('token') || '' },
    success(res) {
      if (res.status !== 0) return layui.layer.msg('用户信息获取失败')
      renderUser(res.data)
    }
  })
}
// 渲染用户信息
function renderUser(user) {
  const uname = user.nickname || user.username
  //   渲染名字
  $('.welcome').html('欢迎你！' + uname)
  //   渲染图片
  if (user.user_pic) {
    // 如果用户有图片头像信息
    $('.layui-nav-img').show().prop('src', user.user_pic).siblings('.text-avatar').hide()
  } else {
    //   否则用名字第一个字符
    const first = uname[0].toUpperCase()
    $('.text-avatar').show().html(first).siblings('.layui-nav-img').hide()
  }
}
