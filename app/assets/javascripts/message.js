 $(function() {
	function appendMessage(message){
		var html = `<ul class="chat-messages">
									<div class="rightcontent--content-speaker">
									${message.user_name}
									</div>
									<div class="rightcontent--content-timestamps">
									${message.day}
									</div>
									<div class="rightcontent--content-talk">
										${message.body}
									</div>
										</ul>`;
			if(message.image.url != null) {
				html = html.replace(/<\/ul>/g, `<div class="image"><img src="${message.image.url}" class="large-img"><\/div><\/ul>`)
			}
		$('.rightcontent--content').append(html);
	}

	$('#new_form').on('submit', function(e){
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
	})
});
