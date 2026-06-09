# ShoppyGlobe Backend API

ShoppyGlobe Backend API is a Node.js and Express REST API for an e-commerce application. It connects to MongoDB with Mongoose, stores users and carts, exposes product browsing endpoints, and protects cart operations with JWT authentication.

## Technology Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens
- bcryptjs
- dotenv
- cors

## Prerequisites

- Node.js installed on your computer.
- MongoDB running locally or a MongoDB Atlas connection string.
- ThunderClient installed in VS Code for API testing.
- MongoDB Compass or Atlas dashboard access for collection screenshots.

## Setup Instructions

1. Clone the repository.
2. Open the project folder:

```bash
cd shoppyglobe-backend
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shoppyglobe
JWT_SECRET=replace_this_with_a_long_random_secret
```

5. Seed sample products:

```bash
npm run seed
```

6. Start the development server:

```bash
npm run dev
```

7. Open this health-check URL:

```text
http://localhost:5000/
```

The API base URL is:

```text
http://localhost:5000/api
```
