require 'rails_helper'

describe Message do

  let(:message) { build(:message) }


  describe '#create' do
    it "is valid with a body, group_id, user_id" do
      expect(message).to be_valid
    end

    it "is invalid without a body" do
      message.body = ""
      message.valid?
      expect(message.errors[:body]).to include("を入力して下さい。")
    end

    it "is invalid without a group_id" do
      message = build(:message, group_id: "")
      message.valid?
      expect(message.errors[:group_id]).to include("を入力してください。")
    end

    it "is invalid without a user_id" do
      message = build(:message, user_id: "")
      message.valid?
      expect(message.errors[:user_id]).to include("を入力してください。")
    end
  end
end