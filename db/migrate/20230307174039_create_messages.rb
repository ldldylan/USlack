class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.text :text, null: false
      t.references :author, null: false, foreign_key: {to_table: :users}
      t.references :messageable, polymorphic: true
      t.timestamps
    end
  end
end
