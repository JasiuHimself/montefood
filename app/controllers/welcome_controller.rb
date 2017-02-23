class WelcomeController < ApplicationController
before_action :set_auth
  #
  # //
  # // chcę mieć kontroler
  # // before action
  # // ensure authentication
  # // i tam wymuszam że jak ktoś jest niezalogoawny to np przeniesie na fb

  def index
  end

  private

    def set_auth
      @auth = session[:omniauth] if session[:omniauth]
    end
end
