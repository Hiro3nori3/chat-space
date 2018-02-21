module MessagesHelper
	def message_time(message)
		message.created_at.to_s(:default)
	end
end
