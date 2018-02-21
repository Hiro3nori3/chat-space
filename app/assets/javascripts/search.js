$(function() {
	var userList = $("#user-search-result")

	function appendUser(user) {
	 var html = `<div class="chat-group-user clearfix">
								<p class="chat-group-user__name">${user.name}</p>
								<a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
							</div>`
		userList.append(html)
	}

	function appendNoUser(user) {
		var html = `<li>
									<div class='chat-group-user clearfix'>${ user }</div>
								</li>`
		userList.append(html);
	}

	function appendUserToGroup(user){
		var user_id = $(user).data("user-id");
		var user_name = $(user).data("user-name");
		var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
									<input name='group[user_ids][]' type='hidden' value='${user_id}'>
									<p class='chat-group-user__name'>${user_name}</p>
									<a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
								</div>`
		$("#chat-group-users").append(html);
	}


	$("#user-search-field").on("keyup", function() {
		var input = $("#user-search-field").val();
		$.ajax({
			type: 'GET',
			url: '/users/search',
			data: { keyword: input },
			dataType: 'json'
		})
		.done(function(users) {
			$("#user-search-result").empty();
				if (users.length !== 0) {
					users.forEach(function(user){
					appendUser(user);
				});
				}	else{
				 appendNoUser("一致するユーザがいません");
				}
		})
		.fail(function() {
			alert('ユーザ検索に失敗しました');
		})
	});
	$(document).on('click', '.user-search-add', function(){
		var user = $(this).parent();
		user.remove();
		appendUserToGroup($(this));
	});

	$(document).on("click",".user-search-remove",function(e){
		e.preventDefault();
		var user = $(this).parent();
		user.remove();
	});
});
