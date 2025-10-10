- Creat New Repository
- Initialize Repository
- node modules, package.json, package-lock.json
- Install Expess
- What are dependencies
- Use of "-g" while npm install 
- Difference between Caret and Tilde ('^' and '~')

## 🌐 Creating Server 🚀
- Import Express
- Create web server using express()
- Listening requests from port
- Write Request handlers /test, /, /head
- Install nodemon and update script inside package.json
- Initialise git
- .gitignore
- Create remote repo on github don't enable README.MD option
- Push all code to remote origin -  'git add .' , git commit -m "Branch_Name",  Three commands to push code remote repo 
- Play with Route, Route Extensions ex./test, / , /head
- Order of routes matters a lot
- Install Postman create workspace/collection/ Test API Calls
- Write logic to handle GET, POST, DELETE, API calls and test on Postman
- Explore routing and use of ?, +, (), * in the routes.
- Use of regex in the routes /a, / , /.*fly$
- Reading query params in the routes.
- Reading dynamic routes.

## ⚙️🚦 Middlewares & Error Handlers 🔧
- Handling Multiple Routes - Play With Code
- next()
- next function and errors along with res.send()
- app.use("/route", rh, [rh2,rh3], rh4, rh5)
- What is Middleware? Why do we need it?
- How ExpressJS handles request behind scenes?
- Difference between .use() and .all()
- Write dummy auth middleware for admin
- Write dummy auth middleware for all user routes, except user/login
- Error Handelling using app.use("/",(err,req,res,next)=> if(err){res.status(500).send("Something Went Wrong !!")})

## 🛢️ Database, Schema & Models 🧩 | 📝 MongoDB, Mongoose🔗
- Create a cluster on MongoDB official site and create a user(Mongo Atlas)
- Install mongoose library
- Connect your application to database "connectionString/ db_name"
- Call connectDB function and connect database before starting application on 8888.
- Create a userSchema & user Model
- Create POST /signup API to add data to db.
- Push some doscuments through API calls from postman
- Error Handeling using try, catch 

## Creating API — Sync/loop (RESTful actions, CRUD) 🔁
- Add the express.json middleware to your app
- Make your signup API dynamic to receive data from end user
- User.findOne with duplicate email ids, which object returns
- API - GET user by emailId
- API - Feed API to get all users from DB
- Differrence between PATCH and PUT
- API - Update a user by ID and for pratice by emailId

## 🧹 Data Sanitization & Schema Validations 🧱
- Explore schematype options from the documentation
- Add required, unique, trim, min/max Lingth, min/max.
- Create custom validator function for gender
- Add timestamps to the userSchema
- Add API level validation on PATCH an PUT request & signup POST API
- Data sanitization add API validation for each field
- Install & explore validator functions and use for fields.
- NEVER TRUST req.body

## 🛡️ Encrypting Passwords
- Validate data in Signup API
- Install bcrypt package
- Create passwordHash using bcypt.hash & save the user is encrypted password
- Create login API
- Compare passwords and throw error if email or password is invalid.

## 🔐 Authentication, 💫 JWT & Cookies 🍪 
- Install cookie-parser
- Just send dummy cookie to user
- Create GET /profile and check you get cookie back.
- Install jsonwebtoken
- In Login API, after Email & pwd validation create JWT and send it back to user.
- userAuth middleware and add it to user API's
- Set expiry of JWT token, cookie to 3 min
- Create userSchema methods to get JWT() - Utility Method make code clean, crisp and readable.
- Create userSchema method for password to compare dbPassword with passwordInputByUser.

## Diving into API's & Express Router
- Explore tinder API's
- Create alist of all API's you can think of in DEV Tinder
- Group multipe routes under respective routers
- Read documentation for express.Router()
- Create routes folder for managing auth, profile, request routers
- Create authRouter, profileRouter, requestRouter
- Import these routers in app.js
- Create POST/logout API
- Create POST /profile/edit
- Create POST /profile/password API => forget password API
- Make you validate all data in every POST API 

## Index in MongoDB
- Create connection Request Schema
- Send connection Request API and add validation
- Handle corner cases
- schema.pre("save") function 
- $or and $and query in Mongoose
- Read more about index in MongoDB
- Why do we need index in DB?
- What is advantage and disadvantage of creating?
- Read mongoDB article on compound index
