# VotingApp API

VotingApp API is a robust backend service for managing a voting system. It provides endpoints for user authentication, candidate management, and vote tracking.

## 🌟 Features

- 👤 User authentication and profile management
- 🗳️ Candidate creation, updating, and deletion (admin only)
- 🗽 Voting functionality
- 📊 Vote counting and results

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens) for authentication
- bcrypt for password hashing

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Chetan3010/votingApp.git
   cd votingapp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   mongoDbURL=your_mongodb_connection_string
   JWTSECRETKEY=your_jwt_secret_key
   ```

4. Start the server:
   ```
   npm start
   ```

The API will be available at `http://localhost:3000`.

## 📚 API Endpoints

### User Management

* **POST /signup**
  - Create a new user account
  - Body: `{ "name": "string", "age": "number", "aadharNo": "number", "mobile":"string", "email":"string", "address":"string", "password":"string", "role": "enum" }`

* **POST /signin**
  - Sign in and get a JWT token
  - Body: `{ "aadharNo": "number", "password": "string" }`

* **GET /profile**
  - Get user profile details
  - Requires JWT authentication

* **PUT /profile/password**
  - Update user password
  - Requires JWT authentication
  - Body: `{ "password": "string" }`

### Candidate Management

* **POST /**
  - Create a new candidate
  - Admin only, requires JWT authentication
  - Body: `{ "name": "string", "party": "string", "age": "number" }`

* **PUT /:candidateId**
  - Update candidate details
  - Admin only, requires JWT authentication
  - Body: `{ "name": "string", "party": "string", "age": "number" }`

* **DELETE /:candidateId**
  - Delete a candidate
  - Admin only, requires JWT authentication

* **GET /**
  - Get list of all candidates
  - Public endpoint

### Voting

* **POST /vote/:candidateId**
  - Vote for a candidate
  - Requires JWT authentication

* **GET /vote/counts**
  - Get vote counts sorted by number of votes
  - Public endpoint

## 🔐 Authentication

This API uses JWT for authentication. To access protected endpoints, include the JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

Project Link: [https://github.com/Chetan3010/votingapp](https://github.com/Chetan3010/votingapp)