require "active_record"
require "../environment"

class CreateListsTable < ActiveRecord::Migration[5.0]
  def change
    create_table :lists do |t|
      t.string :name
      t.references :user
    end
  end
end

CreateListsTable.migrate(ARGV[0].to_sym)
