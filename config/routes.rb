Rails.application.routes.draw do


  root 'welcome#index'
  get 'auth/:provider/callback', to: "sessions#create"
  delete 'sign_out', to: "sessions#destroy", as: "sign_out"
  # root "api/orders#index" #potem można wywalić

  namespace :api do
    resources :orders, only: [:index, :show, :create, :update] do
      resources :meals, only: [:index, :create]
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
