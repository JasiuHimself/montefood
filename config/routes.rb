Rails.application.routes.draw do
  get 'welcome/index'

  root 'welcome#index'
  # root "api/orders#index" #potem można wywalić

  namespace :api do
    resources :orders, only: [:index, :show]
    resources :meals, only: [:index, :show]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
