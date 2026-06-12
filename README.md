# ShoppyGlobe Backend API

ShoppyGlobe Backend API is a Node.js and Express REST API for an e-commerce application. It connects to MongoDB with Mongoose, stores users and carts, exposes product browsing endpoints, and protects cart operations with JWT authentication.

## GitHub repository:

`https://github.com/Rishithecodestarter1/Shoppyglobe`

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

4. Copy `.env.example` to `.env`, then update the values if needed:

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

7. Open this URL:

```text
http://localhost:5000/
```

The API base URL is:

```text
http://localhost:5000/api
```

## Final Submission Folder

Submit this folder as the completed backend assignment:

```text
shoppyglobe-backend
```

It contains the API source code, setup documentation, seed script, ThunderClient evidence screenshots, `TEST_REPORT.md`, and the supporting JWT secret utility under `tools/jwt-secret-utility`.

## Authentication

Registration and login return a JWT token. Cart routes require this token in the request header:

```text
Authorization: your_token_here
```

The token identifies the logged-in user, so each cart request only reads or changes that user's own cart.

|
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

## API Testing

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

## Final Evidence Files

The final API evidence is stored in:

```text
screenshots/
```

The folder should contain exactly 16 screenshots named `test01.png` through `test15.png`, plus `test16_logger.png`. The test summary is documented in `TEST_REPORT.md`.

## JWT Secret Utility

This submission also includes a supporting JWT secret helper at:

```text
tools/jwt-secret-utility
```

Use it when you need to generate, verify, or demo-load a strong JWT secret for `.env`:

```bash
cd tools/jwt-secret-utility
npm install
npm run generate
npm run verify
npm run demo
```

The copied utility intentionally does not include its local `.env`, `node_modules`, or nested `.git` folder. Generated secrets should stay local and must not be committed to GitHub.

## Git Commit Strategy

The assignment asks for at least 20 meaningful commits. Commit after each logical change using commands like these:

```bash
git add .
git commit -m "chore: initialize Node.js project with ES modules"
git add .
git commit -m "chore: install Express MongoDB auth and dev dependencies"
git add .
git commit -m "feat: connect to MongoDB with Mongoose"
git add .
git commit -m "feat: create Product model with stock validation"
git add .
git commit -m "feat: create User model with password comparison"
git add .
git commit -m "feat: create Cart model with user-owned items"
git add .
git commit -m "feat: implement JWT authentication middleware"
git add .
git commit -m "feat: implement register and login controllers"
git add .
git commit -m "feat: add authentication routes"
git add .
git commit -m "feat: add product browsing endpoints"
git add .
git commit -m "feat: implement cart controller operations"
git add .
git commit -m "feat: protect and mount cart routes"
git add .
git commit -m "feat: add global JSON error handling"
git add .
git commit -m "feat: add product seed script"
git add .
git commit -m "docs: add project overview and setup instructions"
git add .
git commit -m "docs: add API endpoint reference"
git add .
git commit -m "docs: add ThunderClient testing guide"
git add .
git commit -m "docs: add Git commit and submission guidance"
git add .
git commit -m "test: add screenshot folders for API evidence"
git add .
git commit -m "chore: add environment variable example"
```

## Submission Checklist

- `npm run dev` starts the API without errors after MongoDB is configured.
- `npm run seed` inserts sample products.
- No `require` or `module.exports` syntax is used because this project uses ES Modules.
- Product, User, and Cart models include required validation.
- Registration hashes passwords with bcrypt before saving.
- Login returns a JWT token and user information.
- Cart routes return `401` without a valid Bearer token.
- Cart operations only use the logged-in user's cart.
- Controllers use `try/catch` and pass unexpected errors to the global error handler.
- `node_modules` and `.env` are excluded by `.gitignore`.
- ThunderClient screenshots and MongoDB screenshots are included before final submission.
