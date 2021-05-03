Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  get '/cards', to: 'homes#index'

  namespace :api do
    namespace :v1 do
      resources :cards, only: [:index]
    end
  end
end
