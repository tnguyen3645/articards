Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  get '/cards', to: 'homes#index'
  get '/decks', to: 'homes#index'

  namespace :api do
    namespace :v1 do
      resources :decks, only: [:index]
      resources :cards, only: [:index]
    end
  end

end
