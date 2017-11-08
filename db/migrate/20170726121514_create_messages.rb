class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
    	t.text :body
    	t.text :image
    	t.integer :group_id, foreign_key: true, null: false
    	t.integer :user_id, foreign_key: true, null: false
      t.timestamps
    end
  end
end
