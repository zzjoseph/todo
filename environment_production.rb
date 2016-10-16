require "active_record"

ActiveRecord::Base.default_timezone = :local

ActiveRecord::Base.establish_connection(
  adapter: "postgresql",
  host: "127.0.0.1",
  username: "...",
  database: "todo"
)
