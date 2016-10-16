require "sinatra"
require "sinatra/json"
require "./environment"
require "./models/user"
require "./models/list"
require "./models/item"

enable :sessions
set :session_secret, 'holy grail'

get '/' do
  if session[:user_id]
    redirect to('/lists')
  else
    erb :index
  end
end

post '/signup' do
  content_type :json
  username = params[:username]
  password = params[:password]
  user = User.register(username, password)
  if user
    User.authenticate(username, password)
    session[:user_id] = user.id
    json user_id: user.id
  else
    json error: "Username has already been taken"
  end
end

post '/login' do
  content_type :json
  username = params[:username]
  password = params[:password]
  user = User.authenticate(username, password)
  if user
    session[:user_id] = user.id
    json user_id: user.id
  else
    json error: "Username and password does not match"
  end
end

get '/logout' do
  session.delete(:user_id)
  redirect to('/')
end

get '/lists' do
  erb :index
end

get '/api/lists' do
  content_type :json
  user_id = session[:user_id]
  if user_id
    json List.where(user_id: user_id)
  else
    json error: "Login is required"
  end
end

post '/api/lists' do
  content_type :json
  user_id = session[:user_id]
  if user_id
    User.find(user_id).lists.create(name: params[:name])
    json msg: "list created"
  end
end

post '/api/items' do
  content_type :json
  user_id = session[:user_id]
  if user_id
    List.find(params[:list_id]).items.create(description: params[:description], due: params[:due])
    json msg: "item created"
  end
end

get '/api/lists/:id' do
  content_type :json
  user_id = session[:user_id]
  if user_id
    json Item.where(list_id: params[:id])
  else
    json error: "Login is required"
  end
end

delete '/api/lists/:id' do
  content_type :json
  user_id = session[:user_id]
  if user_id
    Item.where(list_id: params[:id]).delete_all()
    List.delete(params[:id])
    json msg: 'list is deleted'
  end
end

put '/api/items/:id' do
  content_type :json
  user_id = session[:user_id]
  if user_id
    item = Item.find(params[:id])
    request.body.rewind
    data = JSON.parse request.body.read
    item.update(data)
    json msg: "item updated"
  else
    json error: "Login is required"
  end
end

delete '/api/items/:id' do
  content_type :json
  user_id = session[:user_id]
  if user_id
    Item.delete(params[:id])
    json msg: "item is deleted"
  end
end
