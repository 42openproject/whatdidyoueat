# -------------------------------------------------------------------
# -----------------------/login/google-------------------------------
# -------------------------------------------------------------------
# POST /login/google
# curl \
# -H "Content-Type: application/json" \
# -d '{"googleId":"123", "email":"mki@student.42seoul.kr"}' \
# -X POST 'http://localhost:3001/login/google'

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

# GET /title/:id
# query parameter: date=YYYY-MM-DD
# curl -X GET 'http://localhost:3001/titles/mki?date=2021-12-01'

# POST /title/:id
# body: googleId, title
curl \
-H "Content-Type: application/json" \
-d '{"googleId":"123", "title":"mki의 이유식일기234"}' \
-X POST 'http://localhost:3001/titles/mki'

# -------------------------------------------------------------------
# -----------------------/posts/:id----------------------------------
# -------------------------------------------------------------------
# POST /posts/:id
# body: googleId, title
# curl \
# -H "Content-Type: application/json" \
# -d '{"googleId":"123", "textContent": "오늘의 아침입니다.", "tagArr": ["밥", "계란"]}' \
# -X POST 'http://localhost:3001/posts/mki'
# curl \
# -H "Content-Type: application/json" \
# -d '{"googleId":"123", "textContent": "오늘의 점심입니다.", "tagArr": ["밥", "치킨"]}' \
# -X POST 'http://localhost:3001/posts/mki'
# curl \
# -H "Content-Type: application/json" \
# -d '{"googleId":"123", "textContent": "오늘의 저녁입니다.", "tagArr": ["밥", "국수"]}' \
# -X POST 'http://localhost:3001/posts/mki'

# GET /posts/:id
# query parameter: date=YYYY-MM-DD
# curl -X GET 'http://api.whatdidyoueat.net:3001/posts/dhyeon?date=2021-12-06'