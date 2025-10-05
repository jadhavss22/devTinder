
## authRouter
POST        /signup
POST        /login
POST        /logout

## profileRouter
GET        /profile/view
POST       /profile/edit
POST       /profile/password
DELETE     /profile/delete

## connectionRequestRouter
GET         /feed
POST        /requestSend/interested/:userId
POST        /requestSend/reject/:userId
POST        /review/accept/:requestId
POST        /review/reject/:requestId

## userRouter
GET         /user/connections
GET         /user/requests
GET         /user/feed - Gets you the others users profile on platform