# Todo App Backend with Authentication
This is a secure backend API built with Node.js, Express, MongoDB, and JWT for handling a Todo application with authentication. It supports user sign-up, login (with password hashing), and authenticated todo operations.

---

##  Features
- User Sign-Up with validation using *zod*
- Secure password hashing using *bcrypt*
- User Login with JWT-based token generation
- Authenticated Todo creation and retrieval
- MongoDB database with Mongoose models

---

##  Tech Stack
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT (jsonwebtoken)
- bcrypt (password hashing)
- zod (input validation)

---

##  Getting Started
Follow these steps to set up and run the backend locally.

### 1. Clone the repository
bash
git clone https://github.com/prajakta40281/todo-auth-backend.git
cd todo-auth-backend


### 2. Install dependencies
bash
npm install


### 3. Configure your environment
Create a '.env' file in the root of the project with the following contents:

MONGODB_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_key_here


### 4. Start the server
bash
node index.js

Server runs on:
http://localhost:3000


---

##  Authentication
Protected routes (/todo, /todos) require an *Authorization header* with a Bearer token:
Authorization: Bearer <your_token>


---

##  API Endpoints

### POST /signup
Registers a new user with email, password, and name.

*Request:*
json
{
  "email": "example@gmail.com",
  "name": "Prajakta",
  "password": "secure123"
}


*Response:*
json
{
  "message": "You are logged in"
}


---

### POST /signin
Authenticates user and returns a JWT token.

*Request:*
json
{
  "email": "example@gmail.com",
  "password": "secure123"
}


*Response:*
json
{
  "token": "your_jwt_token"
}


---

### POST /todo
Creates a new todo item (Requires JWT token).

*Headers:*
Authorization: Bearer <token>


*Request:*
json
{
  "title": "Buy groceries",
  "done": false
}


*Response:*
json
{
  "message": "Todo created"
}


---

### GET /todos
Fetches all todos of the authenticated user.

*Headers:*
Authorization: Bearer <token>


*Response:*
json
{
  "todos": [
    {
      "_id": "12345",
      "title": "Buy groceries",
      "done": false,
      "userId": "67890"
    }
  ]
}


---

##  Project Structure
todo-auth-backend/
├── index.js         # Main server file
├── db.js            # Mongoose models (UserModel, TodoModel)
├── auth.js          # JWT auth middleware
├── package.json     # Project metadata and dependencies
├── README.md        # Documentation


---

##  Author
Made with vs code by *prajakta40281*

---

##  License
This project is open for educational and non-commercial use.