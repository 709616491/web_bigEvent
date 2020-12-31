$(function () {
  // 获取用户信息
  getUserMsg()
  //   退出
  $('#indexExit').on('click', function () {
    layui.layer.confirm('确定要退出吗?', { icon: 3, title: '提示' }, function (index) {
      // 确定则进入函数体
      // 1.  清除本地存储的token数据
      localStorage.removeItem('token')
      // 2.  发起请求清除服务器的token数据
      //   这次未提供后端接口，所以不清除
      // 3.  跳转到登录页面
      location.href = '/login.html'

      layer.close(index)
    })
  })
})
// 发送请求获取用户信息
function getUserMsg() {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
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
