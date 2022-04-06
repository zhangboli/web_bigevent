$(function () {
  var form = layui.form
  var layer = layui.layer

  initUserInfo()

  form.verify({

    nickname: function (value, item) { //value：表单的值、item：表单的DOM对象
      if (value.length > 6) {
        return '昵称不等大于6个字符！'
      }
    }
  })

  $('.layui-form').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status !== 0) {
          return layer.msg('更新用户信息失败！')
        }
        console.log("更新用户信息成功！")

        window.parent.getUserInfo()

      }
    });
  });

  $('#btnReset').click(function (e) {
    e.preventDefault();
    initUserInfo();
  });

  function initUserInfo () {
    $.ajax({
      type: "get",
      url: "/my/userinfo",
      data: "",
      success: function (response) {
        if (response.status !== 0) {
          return layer.msg('获取用户信息失败！')
        }
        console.log(response)

        form.val('formUserInfo', response.data)
      }
    });
  }

})