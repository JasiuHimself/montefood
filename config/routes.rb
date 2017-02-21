Rails.application.routes.draw do
  get 'welcome/index'

  root 'welcome#index'
  # root "api/orders#index" #potem można wywalić

  namespace :api do
    resources :orders, only: [:index, :show, :create] do
      resources :meals, only: [:index, :create] #bo tylko pobieramy wszystkie dla orderu
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
