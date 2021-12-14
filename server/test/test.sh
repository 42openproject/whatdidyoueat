# -------------------------------------------------------------------
# -----------------------/login/google-------------------------------
# -------------------------------------------------------------------
# POST /login/google
# curl \
# -H "Content-Type: application/json" \
# -d '{"googleId":"104760257817400625505", "email":"mki@student.42seoul.kr"}' \
# -X POST 'http://localhost:3001/login/google'

# curl \
# -H "Content-Type: application/json" \
# -d '{"googleId":"104760257817400625505"}' \
# -X POST 'http://localhost:3001/login/google'

# -------------------------------------------------------------------
# -----------------------/users/nickname-----------------------------
# -------------------------------------------------------------------
# POST /users/nickname
# curl \
# -H "Content-Type: application/json" \
# -d '{"nickname":"mki", "googleId":"104760257817400625505"}' \
# -X POST 'http://localhost:3001/users/nickname'

# GET /users/nickname?googleId=
# curl -X GET 'http://localhost:3001/users/nickname?googleId=104760257817400625505'

# -------------------------------------------------------------------
# -----------------------/title/:id----------------------------------
# -------------------------------------------------------------------
# GET /title/:id
# curl -X GET 'http://localhost:3001/titles/104760257817400625505'

# GET /title/:id
# query parameter: date=YYYY-MM-DD
# curl -X GET 'http://localhost:3001/titles/dhyeon?date=2021-12-01'
# curl -X GET 'http://localhost:3001/titles/mki?date=2021-12-09'
# curl -X GET 'http://api.whatdidyoueat.net:3001/titles/mki?date=2021-12-09'


# POST /title/:id
# body: googleId, title
# curl \
# -H "Content-Type: application/json" \
# -d '{"googleId":"104760257817400625505", "title":"mki의 이유식일기234"}' \
# -X POST 'http://localhost:3001/titles/mki'
# curl \
# -H "Content-Type: application/json" \
# -d '{"googleId":"115431890450468550160", "title":"dhyeon은 react를 씹어요"}' \
# -X POST 'http://localhost:3001/titles/dhyeon'
# curl \
# -H "Content-Type: application/json" \
# -d '{"googleId":"104760257817400625505", "title":"mki의 이유식일기2567"}' \
# -X POST 'http://api.whatdidyoueat.net:3001/titles/mki'

# -------------------------------------------------------------------
# -----------------------/posts/:id----------------------------------
# -------------------------------------------------------------------
# POST /posts/:id
# body: googleId, title
# curl \
# -H "Content-Type: application/json" \
# -d '{"googleId":"104760257817400625505", "textContent": "오늘의 아침입니다.", "tagArr": ["밥", "계란"]}' \
# -X POST 'http://localhost:3001/posts/mki'
# curl \
# -H "Content-Type: application/json" \
# -d '{"googleId":"104760257817400625505", "textContent": "오늘의 점심입니다.", "tagArr": ["밥", "치킨"]}' \
# -X POST 'http://localhost:3001/posts/mki'
# curl \
# -H "Content-Type: application/json" \
# -d '{"googleId":"104760257817400625505", "textContent": "오늘의 저녁입니다.", "tagArr": ["밥", "국수"]}' \
# -X POST 'http://localhost:3001/posts/mki'

# GET /posts/:id
# query parameter: date=YYYY-MM-DD
# curl -X GET 'http://api.whatdidyoueat.net:3001/posts/dhyeon?date=2021-12-06'

# -------------------------------------------------------------------
# -----------------------/calendar/:id/----------------------------------
# -------------------------------------------------------------------
# GET /posts/:id
# query parameter: year=2021, month=12
# curl -X GET 'http://localhost:3001/calendar/mki?year=2021&month=12'

# -------------------------------------------------------------------
# -----------------------/users/:id/tag------------------------------
# -------------------------------------------------------------------
# GET /users/:id/tag
# query parameter: googleId=2021, month=12
# curl -X GET 'http://localhost:3001/users/mki/tag'

# POST /users/:id/tag
# body: googleId, tag
# curl \
# -H "Content-Type: application/json" \
# -d '{"googleId":"104760257817400625505", "tag":"다이어트3"}' \
# -X POST 'http://localhost:3001/users/mki/tag'

# DELETE /users/:id/tag/:tagid
# body: googleId, tagId
# curl -X DELETE 'http://localhost:3001/users/mki/tag/10'

# GET /users/nickname/check/:id
curl -X GET 'http://localhost:3001/users/nickname/check/mkif'
