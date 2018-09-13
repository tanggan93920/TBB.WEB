$(function () {
	var path = 'https://api.tunbiba.com';
	var userInfo = JSON.parse(localStorage.getItem('userInfo'));

	if (userInfo) {
		$('#user-status .dropup-menu .btn-default').text('欢迎你，' + userInfo.UserName);
		$('#user-status .dropup-menu').show();
		$('#user-status .login-btn').hide();
		$('#personCenter').show();
	} else {
		$('#user-status .dropup-menu').hide();
		$('#user-status .login-btn').show();
		var url = window.location.pathname;
		if (url.indexOf('person.html') > -1
			|| url.indexOf('vip.html') > -1
			|| url.indexOf('winmoney.html') > -1
			|| url.indexOf('/password.html') > -1
			|| url.indexOf('buy.html') > -1
			|| url.indexOf('spread.html') > -1
			|| url.indexOf('order.html') > -1) {
			var host = window.location.protocol + '//' + window.location.host + '/login.html';
			window.location.href = host;
		}
	}

	var _openLevelHtml = '';
	_openLevelHtml += '<div class="modal fade" id="openLevelModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
	_openLevelHtml += '<div class="modal-dialog" style="margin: 80px auto; background: #fff;border-radius: 10px">';
	_openLevelHtml += '<div class="modal-content" style="padding: 30px;box-shadow: 0 0 0 transparent; border: 0">';
	_openLevelHtml += '<div class="" style="text-align: center; font-size: 16px">暂未开放，敬请期待</div></div></div></div>';
	$('body').append(_openLevelHtml);

	var _contactHtml = '';
	_contactHtml += '<div class="modal fade" id="contactModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
	_contactHtml += '<div class="modal-dialog" style="margin: 80px auto; background: #fff;border-radius: 10px">';
	_contactHtml += '<div class="modal-content" style="padding: 30px;box-shadow: 0 0 0 transparent; border: 0">';
	_contactHtml += '<div class="" style="font-size: 16px"><div>客服微信：TBB89765<span style="color: red">（关于订单有问题添加客服处理）</span></div><div>邮箱：tbb89765@163.com</div></div></div></div></div>';
	$('body').append(_contactHtml);

	$.ajaxSetup({
		contentType: "application/x-www-form-urlencoded;charset=utf-8",
		complete: function (XMLHttpRequest, textStatus) { },
		statusCode: {
			401: function () {
				localStorage.setItem('userInfo', null);
				var host = window.location.protocol + '//' + window.location.host + '/login.html';
				window.location.href = host;
			},
		}
	});

	$('#logout').click(function () {
		$.post(path + '/Api/User/LoginOut', {
			Token: userInfo.Token,
			From: 1
		}, function (result) {
			if (result.Success) {
				if (result.ResponseObject) {
					bw.toast(result.Message);
					localStorage.setItem('userInfo', null);
					var host = window.location.protocol + '//' + window.location.host + '/index.html';
					window.location.href = host;
				} else {
					bw.toast(result.Message);
				}
			} else {
				bw.toast(result.Message);
			}
		});
	});

	$('.openLevel').click(function () {
		$('#openLevelModal').modal('show');
	});

	$('#contact').click(function () {
		$('#contactModal').modal('show');
	});

});

// Toast消息
var bw = {};
bw.list = [];
bw.toast = function (txt) {
	var i = 38;
	if (bw.list.length) {
		bw.list.forEach(function (element, index) {
			element.setAttribute('style', 'top: ' + (bw.list.length + index) * i + 'px;');
		});
	}
	var toast = document.createElement('div');
	toast.classList = 'bw-toast';
	toast.setAttribute('style', 'top: 50px;');

	var msg = document.createTextNode(txt);
	toast.append(msg);
	bw.list.push(toast);
	document.body.append(toast);

	setTimeout(function () {
		toast.setAttribute('style', 'top: 60px;');
	}, 0)
	setTimeout(function () {
		toast.parentNode.removeChild(toast);
		bw.list.shift();
	}, 2000)
}

function formatDate(nowDate) {
	var date = new Date(nowDate);
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
}