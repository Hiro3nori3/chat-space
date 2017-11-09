json.user_name  @message.user.name
json.day        @message.created_at.strftime("%Y/%m/%d %H:%M")
json.text       @message.body
json.image      @message.image