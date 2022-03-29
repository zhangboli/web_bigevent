$(function () {
  $('#link_reg').click(function () {
    $(".login-box").hide();
    $('.reg-box').show();
  });

  $('#link_login').click(function () {
    $(".login-box").show();
    $('.reg-box').hide();
  });

  var form = layui.form
  var layer = layui.layer

  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],

    repwd: function (value) {
      var password = $('#password').val()
      if (password !== value) {
        return "两次密码不一致！"
      }
    }
  })

  $('#form_reg').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/api/reguser",
      data: {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
      },
      success: function (response) {
        if (response.status !== 0) {
          return layer.msg(response.message)
        }
        layer.msg("注册成功，请登录！")
        $("#link_login").click()
      }
    });
  });

  $("#form_login").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/api/login",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status !== 0) {
          layer.msg(response.message)
        }
        layer.msg("登录成功！")

        localStorage.setItem('token', response.token)
        location.href = '/大事件项目/index.html'
      }
    });
  });

})