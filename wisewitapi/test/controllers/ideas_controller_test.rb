class MyResourcesControllerTest < ActionController::TestCase


def authenticate
  token = Knock::AuthToken.new(payload: { sub: users(:one).id }).token
  request.env['HTTP_AUTHORIZATION'] = "Bearer #{token}"
end

setup do
  authenticate
end

it 'responds successfully' do
  get :index
  assert_response :success
end

end
