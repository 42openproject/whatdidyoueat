# -------------------------------------------------------------------
# -----------------------/login/google-------------------------------
# -------------------------------------------------------------------
# POST /login/google
curl \
-H "Content-Type: application/json" \
-d '{"googleId":"1234", "email":"mki@student.42seoul.kr"}' \
-X POST 'http://localhost:3001/login/google'

# curl \
# -H "Content-Type: application/json" \
# -d '{"googleId":"123"}' \
# -X POST 'http://localhost:3001/login/google'

# -------------------------------------------------------------------
# -----------------------/users/nickname-----------------------------
# -------------------------------------------------------------------
# POST /users/nickname
# curl \
# -H "Content-Type: application/json" \
# -d '{"nickname":"mki", "googleId":"123"}' \
# -X POST 'http://localhost:3001/users/nickname'

# GET /users/nickname?googleId=
# curl -X GET 'http://localhost:3001/users/nickname?googleId=104760257817400625505'

# -------------------------------------------------------------------
# -----------------------/title/:id----------------------------------
# -------------------------------------------------------------------
# GET /title/:id
# curl -X GET 'http://localhost:3001/titles/123'

# POST /title/:id
# body: googleId, title
# curl \
# -H "Content-Type: application/json" \
# -d '{"googleId":"123", "title":"mki의 이유식"}' \
# -X POST 'http://localhost:3001/titles/mki'

# GET /title/:id
# query parameter: date=YYYY-MM-DD
# curl -X GET 'http://localhost:3001/titles/mki?date=2021-12-01'