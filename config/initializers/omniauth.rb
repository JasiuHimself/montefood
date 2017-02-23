Rails.application.config.middleware.use OmniAuth::Builder do
  provider :github, 'ae92b3704befd01ee762', '67030b7fb5e4b553131f467d281b07b248be6420'
  provider :facebook, '1452989634745188', '91ed1344201518f4f6e9d8f28688da3c'
end
