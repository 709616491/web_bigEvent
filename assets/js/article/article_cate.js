$(function () {
  const layer = layui.layer
  initArticleList()

  //   获取服务器传回信息
  function initArticleList() {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success(res) {
        if (res.status !== 0) return layer.msg('获取文章失败')
        const htmlStr = template('tpl-cate', res)
        $('.layui-table tbody').html(htmlStr)
      }
    })
  }

  //   添加文章
  let indexAdd = null
  $('#btnAddCate').on('click', function () {
    indexAdd = layer.open({
      type: '1',
      //   弹出框大小
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#tpl-form').html()
    })
  })

  // 给表单提交按钮注册监听事件  事件委托
  $('body').on('submit', '#form', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) return layer.msg('添加失败')
        layer.msg('添加成功')
        // 重新渲染表格信息
        initArticleList()
        // 关闭form栏  弹框
        layer.close(indexAdd)
      }
    })
  })
})
