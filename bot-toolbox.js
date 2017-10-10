"use strict";

$(function() {
  bind();
});

function findDeviceToken() {
  return $("#form-device-token");
}

function bind() {
  $('body').keydown(function(e) {
    if (e.ctrlKey && e.keyCode === 13) {
      triggerSendMessage();
    }
  });
  $("#btn-send").click(function() {
    $(this).blur();
    triggerSendMessage();
  });
}

function triggerSendMessage() {
  let payload = buildPayload();
  $.ajax({
    url: 'https://api.telegram.org/bot'+payload,
    type: 'get',
    success: function(data) {
      let alert = $('<div class="alert alert-success alert-dismissible fade in" role="alert" data-alert-timeout="10000" style="display: none;"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><pre data-placeholder></pre></div>');
      alert.find("pre[data-placeholder]").text(JSON.stringify(data, null, 2));
      $("#alert-container").append(alert);
      alert.slideDown();
      alert.delay(10000).fadeOut(function() {
        alert.remove();
      });
    },
    error: function(data) {
      let alert = $('<div class="alert alert-danger alert-dismissible fade in" role="alert" data-alert-timeout="20000" style="display: none;"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><pre data-placeholder></pre></div>');
      alert.find("pre[data-placeholder]").text(JSON.stringify(data, null, 2));
      $("#alert-container").append(alert);
      alert.slideDown();
      alert.delay(20000).fadeOut(function() {
        alert.remove();
      });
    }
  });
}

function buildPayload() {
	var token = $("#form-device-token").val();
	var message = $("#send-text-message").val();
	var title = $("#send-text-channel").val();
	var payload = [token,"/sendmessage?chat_id=@",title,"&text=",message];
	return payload.join("");		
}