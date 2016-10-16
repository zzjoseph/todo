require "active_record"
require "../environment"

class CreateItemsTable < ActiveRecord::Migration[5.0]
  def change
    create_table :items do |t|
      t.string :description
      t.datetime :due
      t.boolean :finished, default: false
      t.references :list
      t.timestamps
    end
  end
end

CreateItemsTable.migrate(ARGV[0].to_sym)
