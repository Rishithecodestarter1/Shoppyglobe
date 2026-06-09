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

## Authentication

Registration and login return a JWT token. Cart routes require this token in the request header:

```text
Authorization: Bearer your_token_here
```

The token identifies the logged-in user, so each cart request only reads or changes that user's own cart.

## API Endpoint Reference

| Method | Route | Auth Required | Description |
| --- | --- | --- | --- |
| GET | `/` | No | Server health check. |
| GET | `/api/products` | No | Fetch all products. |
| GET | `/api/products/:id` | No | Fetch one product by MongoDB id. |
| POST | `/api/auth/register` | No | Register a new user and receive a JWT. |
| POST | `/api/auth/login` | No | Login and receive a JWT. |
| POST | `/api/cart` | Yes | Add a product to the logged-in user's cart. |
| PUT | `/api/cart/:productId` | Yes | Update the quantity of a cart item. |
| DELETE | `/api/cart/:productId` | Yes | Remove a product from the cart. |

## Request Body Examples

Register:

```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "test123"
}
```

Login:

```json
{
  "email": "test@example.com",
  "password": "test123"
}
```

Add to cart:

```json
{
  "productId": "paste_product_id_here",
  "quantity": 2
}
```

Update cart quantity:

```json
{
  "quantity": 5
}
```

## API Testing with ThunderClient

Use ThunderClient in VS Code and test in this order. Save screenshots in a `screenshots/` folder so the submission proves each route was tested.

1. Health check: `GET http://localhost:5000/`
   Expected: `200` with a running API message.
2. Register success: `POST http://localhost:5000/api/auth/register`
   Body: `{ "username": "testuser", "email": "test@example.com", "password": "test123" }`
   Expected: `201` with `token` and `user`.
3. Register duplicate: repeat the previous request.
   Expected: `409`.
4. Register missing fields: `POST /api/auth/register`
   Body: `{ "email": "test@example.com" }`
   Expected: `400`.
5. Login success: `POST http://localhost:5000/api/auth/login`
   Body: `{ "email": "test@example.com", "password": "test123" }`
   Expected: `200` with `token`. Copy the token for cart tests.
6. Login wrong password:
   Body: `{ "email": "test@example.com", "password": "wrong123" }`
   Expected: `401`.
7. Get all products: `GET http://localhost:5000/api/products`
   Expected: `200` with a `products` array. Copy one product `_id`.
8. Get product by valid id: `GET http://localhost:5000/api/products/<product_id>`
   Expected: `200` with one product.
9. Get product by invalid id: `GET http://localhost:5000/api/products/invalidid123`
   Expected: `400`.
10. Get product by missing but valid id: `GET http://localhost:5000/api/products/000000000000000000000000`
    Expected: `404`.
11. Add to cart without token: `POST http://localhost:5000/api/cart`
    Expected: `401`.
12. Add to cart with token: `POST http://localhost:5000/api/cart`
    Header: `Authorization: Bearer <token>`
    Body: `{ "productId": "<product_id>", "quantity": 2 }`
    Expected: `201` with cart.
13. Add invalid product to cart:
    Body: `{ "productId": "000000000000000000000000", "quantity": 1 }`
    Expected: `400`.
14. Add invalid quantity:
    Body: `{ "productId": "<product_id>", "quantity": 0 }`
    Expected: `400`.
15. Update cart quantity: `PUT http://localhost:5000/api/cart/<product_id>`
    Header: `Authorization: Bearer <token>`
    Body: `{ "quantity": 5 }`
    Expected: `200`.
16. Update invalid quantity:
    Body: `{ "quantity": -1 }`
    Expected: `400`.
17. Delete cart item: `DELETE http://localhost:5000/api/cart/<product_id>`
    Header: `Authorization: Bearer <token>`
    Expected: `200`.
18. Delete item not in cart:
    Repeat the previous delete request.
    Expected: `404`.

Recommended screenshot names:

```text
screenshots/test-01-health-check.png
screenshots/test-02-register-success.png
screenshots/test-03-register-duplicate.png
screenshots/test-04-register-missing-fields.png
screenshots/test-05-login-success.png
screenshots/test-06-login-wrong-password.png
screenshots/test-07-get-products.png
screenshots/test-08-get-product-by-id.png
screenshots/test-09-invalid-product-id.png
screenshots/test-10-product-not-found.png
screenshots/test-11-cart-without-token.png
screenshots/test-12-cart-add-success.png
screenshots/test-13-cart-invalid-product.png
screenshots/test-14-cart-invalid-quantity.png
screenshots/test-15-cart-update-success.png
screenshots/test-16-cart-update-invalid-quantity.png
screenshots/test-17-cart-delete-success.png
screenshots/test-18-cart-delete-not-found.png
```

## MongoDB Screenshots

After testing, capture MongoDB Compass or Atlas screenshots showing:

- `products` collection with seeded product documents.
- `users` collection with the registered test user.
- `carts` collection with the cart document created during cart tests.

Store them under:

```text
screenshots/mongodb/
```
