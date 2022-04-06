$(function () {

  var form = layui.form
  var layer = layui.layer

  form.verify(
    {

      pass: [
        /^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
      ],

      newPwd: function (value) {
        if (value === $('[name="oldPwd"]').val()) {
          return ('新旧密码必须不一样！')
        }
      },

      reNewPwd: function (value) {
        if (value !== $('[name="newPwd"]').val()) {
          return ('两次确认新密码不一致！')
        }
      }
    }
  )


  $('.layui-form').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/my/updatepwd",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status !== 0) {
          layer.msg('更新密码失败！')
        }
        layer.msg('更新密码成功！')
        $('.layui-form')[0].reset()
      }


    });
  });



})