class User < ApplicationRecord
  def self.sign_in_from_omniauth(auth)
    find_by(provider: auth['provider'], uid: auth['uid']) || create_user_from_omniauth(auth)
  end

  def self.create_user_from_omniauth(auth)
    gen = Random.new(123345)
    acc_tok = gen.rand(99999999999999999999999)
    create(
      provider: auth['provider'],
      uid: auth['uid'],
      name: auth['info']['nickname'],
      image_url: auth['info']['image'],
      access_token: acc_tok
    )

  end
end
