json.array! @messages do |message|
	json.user_name message.user.name
	json.day message_time(message)
	json.body message.body
	json.image message.image
	json.id message.id
end
