$(function () {
  const layer = layui.layer
  const form = layui.form
  const laypage = layui.laypage

  const q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
  }
  initCate()
  initArtList()
  // 查  获取文章列表
  function initArtList() {
    $.ajax({
      type: 'GET',
      url: '/my/article/list',
      data: q,
      success(res) {
        if (res.status !== 0) return layer.msg('列表获取失败')
        const htmlStr = template('tpl-table', res)
        $('.layui-table tbody').html(htmlStr)
        renderPage(res.total)
      }
    })
  }
  // 日期过滤器
  template.defaults.imports.dateFormat = function (str) {
    const date = new Date(str)
    const y = date.getFullYear()
    const m = (date.getMonth() + 1).toString().padStart(2, 0)
    const d = date.getDate().toString().padStart(2, 0)
    const hh = date.getHours().toString().padStart(2, 0)
    const mm = date.getMinutes().toString().padStart(2, 0)
    const ss = date.getSeconds().toString().padStart(2, 0)

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  }
  // 获取文章分类
  function initCate() {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success(res) {
        const htmlStr = template('tpl-cate', res)
        $('[name="cate_id"]').html(htmlStr)
        // layui 重新渲染结构
        form.render()
      }
    })
  }

  // 筛选按钮
  $('#form-search').on('submit', function (e) {
    e.preventDefault()
    q.cate_id = $('[name="cate_id"]').val()
    q.state = $('[name="state"]').val()
    // console.log(q.cate_id, q.state)
    initArtList()
  })

  // 分页
  function renderPage(total) {
    //执行一个laypage实例
    laypage.render({
      elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
      count: total, //数据总数，从服务端得到
      limit: q.pagesize, // 每页显示的条数。
      curr: q.pagenum, // 起始页。
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      limits: [2, 3, 5, 10],
      // jump触发：1.调用renderPage 2.点击页面
      jump: function (obj, first) {
        q.pagenum = obj.curr
        q.pagesize = obj.limit
        if (!first) initArtList()
      }
    })
  }

  // 删 删除功能
  $('tbody').on('click', '.btn-delete', function () {
    const id = $(this).attr('data-id')
    const len = $('.btn-delete').length
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        type: 'GET',
        url: '/my/article/delete/' + id,
        success(res) {
          if (res.status !== 0) return layer.msg('文章删除失败')
          layer.msg('文章删除成功')
          // 如果当前页文章还剩0个则  切换页面
          if (len === 1) q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
          // 重新渲染
          initArtList()
        }
      })
      layer.close(index)
    })
  })
})
