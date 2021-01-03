$(function () {
  const layer = layui.layer
  const form = layui.form
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
      // 弹出层采用模板结构  不用隐藏
      content: $('#tpl-form-add').html()
    })
  })

  // 给表单提交按钮注册监听事件  事件委托
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    // 更新服务器数据
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

  // 修改文章类别
  let indexEdit = null
  // 事件委托
  $('tbody').on('click', '.btn-edit', function () {
    // 弹出层
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#tpl-form-edit').html()
    })
    const id = $(this).attr('data-id')
    // 获取默认数据
    $.ajax({
      type: 'GET',
      url: '/my/article/cates/' + id,
      success(res) {
        if (res.status !== 0) return layer.msg('获取信息失败')
        form.val('form-edit', res.data)
      }
    })
  })

  // 修改提交按钮
  // 事件委托
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    // 更新服务器数据
    $.ajax({
      type: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) return layer.msg('修改失败')
        layer.msg('修改成功')
        // 重新拉取数据
        initArticleList()
        // 关闭form栏  弹框
        layer.close(indexEdit)
      }
    })
  })

  // 删除
  // 事件委托
  $('tbody').on('click', '.btn-delete', function () {
    const id = $(this).data('id')
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      // 更新服务器数据
      $.ajax({
        type: 'GET',
        url: '/my/article/deletecate/' + id,
        success(res) {
          if (res.status !== 0) return layer.msg('删除失败')
          layer.msg('删除成功')
          // 重新获取数据
          initArticleList()
          // 关闭弹窗
          layer.close(index)
        }
      })
    })
  })
})
