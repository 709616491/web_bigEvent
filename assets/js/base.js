// 拦截器
// 这里的形参options就是ajax请求中的实参对象
$.ajaxPrefilter(function (options) {
  options.url = 'http://ajax.frontend.itheima.net' + options.url
  if (options.url.indexOf('/my') !== -1) {
    options.headers = { Authorization: localStorage.getItem('token') || '' }
  }
})
