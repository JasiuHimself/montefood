Rails.application.config.middleware.use OmniAuth::Builder do
  provider :github, 'ae92b3704befd01ee762', '67030b7fb5e4b553131f467d281b07b248be6420'
end
