 $(function() {
	function appendMessage(message){
		var html = `<li data-message-id='${message.id}'>
									<div class="rightcontent--content-speaker">
									${message.user_name}
									</div>
									<div class="rightcontent--content-timestamps">
									${message.day}
									</div>
									<div class="rightcontent--content-talk">
										${message.body}
									</div>
										</li>`;
			if(message.image.url != null) {
				html = html.replace(/<\/li>/g, `<div class="image"><img src="${message.image.url}" class="large-img"><\/div><\/li>`)
			}
		$('.chat-messages').append(html);
	}

	function updateMessage(message, lastId){
		if (message.id > lastId){
			appendMessage(message);
		}
	}

	$('#new_message').on('submit', function(e){
		e.preventDefault();
		var form = $(this).get(0);
		var formData = new FormData(this);
		var url = $(this).attr('action')
		$.ajax({
			url: url,
			type: "POST",
			data: formData,
			dataType: 'json',
			processData: false,
			contentType: false
		})
			.done(function(data){
				appendMessage(data);
				form.reset();
				$('.rightcontent--content').animate({scrollTop: $('.rightcontent--content')[0].scrollHeight}, 'fast');
			 })
			.fail(function(){
				alert('メッセージを入力してください');
			})
			.always(function(){
				$('.rightcontent--footer__button-send').prop("disabled", false);
			})
	});

	if (window.location.href.match(/\/groups\/\d+\/messages/)){
		const FIVESECOND = 5000
		setInterval(function(){
			var url = window.location.href

			$.ajax({
				url: url,
				type: "GET",
				dataType: 'json',
			})
			.done(function(messages){
				lastId = $('li:last').data("messageid");
				messages.forEach(function(message){
					updateMessage(message ,lastId);
				});
			})
			.fail(function() {
				alert('失敗しました');
			})
		}, FIVESECOND);
	}
});
