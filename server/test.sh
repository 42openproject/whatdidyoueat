# GET /users/nickname?googleId=
# curl -X GET 'http://localhost:3001/users/nickname?googleId=104760257817400625505'

# POST /users/nickname
# curl \
# -H "Content-Type: application/json" \
# -d '{"nickname":"456", "googleId":"456"}' \
# -X POST 'http://localhost:3001/users/nickname'

# POST /login/google
# curl \
# -H "Content-Type: application/json" \
# -d '{"googleId":"456", "email":"starswot@gmail.com"}' \
# -X POST 'http://localhost:3001/login/google'