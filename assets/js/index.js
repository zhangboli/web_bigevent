$(function () {

  var layer = layui.layer

  getUserInfo()

  $('#btnLogout').click(function (e) {
    e.preventDefault();
    layer.confirm('是否确认退出？', { icon: 3, title: '提示' }, function (index) {
      //do something
      localStorage.removeItem('token')
      location.href = '/大事件项目/login.html'
      layer.close(index);
    });
  });

})


function getUserInfo () {
  $.ajax({
    type: "get",
    url: "/my/userinfo",
    success: function (response) {
      if (response.status !== 0) {
        return layer.msg(response.msg)
      }
      renderAvatar(response.data)
    }

  });
}



function renderAvatar (user) {
  var name = user.nickname || user.username
  $('#welcome').html("欢迎&nbsp;&nbsp;" + name);
  if (user.user_pic !== null) {
    $('.text-avatar').hide();
    $('.layui-nav-img').show();
    $('.layui-nav-img').attr('src', user.user_pic);
  } else {

    $('.layui-nav-img').hide();
    var firstName = name[0].toUpperCase()
    $('.text-avatar').html(firstName).show();

  }
}