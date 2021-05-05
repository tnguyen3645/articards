Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  get '/cards', to: 'homes#index'
  get '/decks', to: 'homes#index'
  get '/play/:id', to: 'homes#index'

  namespace :api do
    namespace :v1 do
      resources :decks, only: [:index, :show]
      resources :cards, only: [:index, :create]
    end
  end

end