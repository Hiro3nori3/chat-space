class MessagesController < ApplicationController
	before_action :set_group, only: [:index, :create]
	before_action :set_groups, only: [:index, :create]

	def index
		@message = Message.new
		@messages = @group.messages
	end

	def create
		@message = Message.new(message_params)
		@messages = @group.messages
				respond_to do |format|
        format.html { redirect_to group_messages_path(@group), notice: "メッセージを送信しました" }
        format.json
      end
		else
			flash.now[:alert] = "メッセージを入力してください"
			render :index
		end
	end

	private
	def set_group
		@group = Group.find(params[:group_id])
	end

	def set_groups
		@groups = current_user.groups
	end

	def message_params
		params.require(:message).permit(:body, :image).merge(group_id: params[:group_id], user_id: current_user.id)
	end
end
