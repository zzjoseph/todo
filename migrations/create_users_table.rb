require "active_record"
require "../environment"

class CreateUsersTable < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_hash
    end
  end
end

CreateUsersTable.migrate(ARGV[0].to_sym)
