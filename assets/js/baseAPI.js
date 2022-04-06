$.ajaxPrefilter(function (options) {
  options.url = 'http://www.liulongbin.top:3007' + options.url

  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }


  options.complete = function (res) {
    if (res.responseJSON.status === 1
      && res.responseJSON.message === '身份认证失败！') {
      console.log(res.responseJSON)
      console.log(localStorage.getItem('token'))
      localStorage.removeItem('token')
      location.href = '/大事件项目/login.html'
    }
  }
})