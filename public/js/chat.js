// This file is executed in the browser, when people visit /chat/<random id>

$(function () {
	display();
	//<li class="left clearfix"><span class="chat-img pull-left"><img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" class="img-circle" /></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">Jack Sparrow</strong> <small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>12 mins ago</small></div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornaredolor, quis ullamcorper ligula sodales.</p></div></li>
	$('#btn-chat').on('click', function (e) {
		e.preventDefault();
		var msg = $("#btn-input").val().trim();
		if (msg === '') {


		} else {

			var chatObj = {
				me: sessionStorage.userId,
				you: sessionStorage.user2,
				msg: msg
			}
			$("#btn-input").val('');
			console.log(chatObj)
			$.post("/api/chat/", chatObj, function (req, res) {

			}).then(display);
		}
	})
	// $('.media').on('click', function (e) {
	// 	e.prenventDefault();
	// 	#msg-summary

	// })
	setInterval(function () {
		display(); // this will run after every 5 seconds
	}, 2000);

	$(document).on('click','.aMessage', function (e) {
		// alert('clicked');
		
		e.preventDefault();
        var myWindow;
        sessionStorage.user2 =$(this).attr('value');
        console.log('user 2: '+sessionStorage.user2);
            myWindow = window.open("/chat", "", "width=500, height=500");
		
	})

	function display() {
		$.get('/api/chat/', function (data) {
			// console.log(data);
			// console.log(sessionStorage.userId);
			// console.log(sessionStorage.user2);
			if (data.length > 0) {
				$('#chat_id').empty();
				for (var index = 0; index < data.length; index++) {
					if (data[index].userId == sessionStorage.userId && data[index].other_user == sessionStorage.user2) {
						var newDiv = $('<div>');
						newDiv.html('<li class="left clearfix"><span class="chat-img pull-left"><img src="user-images/'+data[index].userId+'.jpg" alt="User Avatar" class="img-circle" width="50px" height="50px" /></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">'+data[index].user.name+'</strong> <small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>12 mins ago</small></div><p>' + data[index].my_message + '</p></div></li>');
						$('#chat_id').prepend(newDiv);
					} else if (data[index].userId == sessionStorage.user2 && data[index].other_user == sessionStorage.userId) {
						var newDiv = $('<div>');
						newDiv.html('<li class="right clearfix"><span class="chat-img pull-right"><img src="user-images/'+data[index].userId+'.jpg" alt="User Avatar" class="img-circle" width="50px" height="50px"/></span><div class="chat-body clearfix"><div class="header"><small class=" text-muted"><span class="glyphicon glyphicon-time"></span>13 mins ago</small><strong class="pull-right primary-font">'+data[index].user.name+'</strong></div><p>' + data[index].my_message + '</p></div></li>');
						$('#chat_id').prepend(newDiv);
					}
				}

			} else {
				$('#chat_id').text('no records');
			}

		})
	
		



	}
});