require 'active_record'
require 'bcrypt'

class User < ActiveRecord::Base
  has_many :lists

  include BCrypt

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def self.register(username, password)
    unless User.find_by(username: username)
      user = User.new
      user.username = username
      user.password = password
      if user.save
        return user
      end
    end
    return nil
  end

  def self.authenticate(username, password)
    user = User.find_by(username: username)
    if user && user.password == password
      return user
    else
      return nil
    end
  end
end
