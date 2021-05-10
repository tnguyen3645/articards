Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  get '/', to: 'homes#index'
  get '/cards', to: 'homes#index'
  get '/decks', to: 'homes#index'
  get '/play', to: 'homes#index'
  get '/decks/new', to: 'homes#index'

  namespace :api do
    namespace :v1 do
      resources :decks, only: [:index, :show, :new, :create]
      resources :cards, only: [:index, :create]
      resources :current_users, only: [:index]
    end
  end

end