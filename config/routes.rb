Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  mount ActionCable.server => '/cable'

  get '/', to: 'homes#index'
  get '/cards', to: 'homes#index'
  get '/decks', to: 'homes#index'
  get '/play', to: 'homes#index'
  get '/about', to: 'homes#index'
  get '/decks/new', to: 'homes#index'
  get '/games/:id', to: 'homes#index'

  namespace :api do
    namespace :v1 do
      resources :decks, only: [:index, :show, :new, :create]
      resources :cards, only: [:index, :create]
      resources :games, only: [:create, :show]
      get "users/current" => "users#current"
    end
  end
end