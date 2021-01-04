// 拦截器
// 这里的形参options就是ajax请求中的实参对象
$.ajaxPrefilter(function (options) {
  // 每个请求都得拼接根路径
  options.url = 'http://api-breakingnews-web.itheima.net' + options.url

  // 如果是需要令牌的就在请求前加上头部
  if (options.url.indexOf('/my') !== -1) {
    options.headers = { Authorization: localStorage.getItem('token') || '' }
  }

  // 请求完成
  options.complete = function (res) {
    // 服务器响应信息为不符合要求
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 强制清除令牌
      localStorage.removeItem('token')
      // 跳转到登陆页面  顶级对象 解决iframe钓鱼bug
      window.top.location.href = '/login.html'
    }
  }
})
