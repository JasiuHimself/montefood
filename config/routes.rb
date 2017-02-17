Rails.application.routes.draw do
  root "api/orders#index" #potem można wywalić

  namespace :api do
    resources :orders, only: :index
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
