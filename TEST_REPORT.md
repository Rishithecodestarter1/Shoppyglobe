# ShoppyGlobe Backend API Test Report

Project: ShoppyGlobe Backend API  
Server URL: `http://localhost:5000`  
Testing evidence: VS Code / Thunder Client-style request and response screenshots  
Evidence folder: `screenshots/`

## Summary

The ShoppyGlobe backend API was tested for authentication, product browsing, protected cart operations, validation errors, unauthorized access, and terminal logger evidence. The final evidence set contains exactly 16 screenshots named `test01.png` through `test15.png`, plus `test16_logger.png`.

The API uses MongoDB ObjectIds for products, so product tests use real IDs returned by `GET /api/products` instead of placeholder numeric IDs.

## Test Evidence

| # | Test | Method and Path | Expected Status | Result | Screenshot |
|---|------|-----------------|-----------------|--------|------------|
| 1 | Register a new user | `POST /api/auth/register` | `201 Created` | Passed | `screenshots/test01.png` |
| 2 | Login with registered user | `POST /api/auth/login` | `200 OK` | Passed | `screenshots/test02.png` |
| 3 | Fetch all products | `GET /api/products` | `200 OK` | Passed | `screenshots/test03.png` |
| 4 | Fetch one product by valid ObjectId | `GET /api/products/:id` | `200 OK` | Passed | `screenshots/test04.png` |
| 5 | Fetch missing product by valid ObjectId | `GET /api/products/000000000000000000000000` | `404 Not Found` | Passed | `screenshots/test05.png` |
| 6 | Add product to cart with token | `POST /api/cart` | `201 Created` | Passed | `screenshots/test06.png` |
| 7 | Add same product again | `POST /api/cart` | `201 Created` | Passed | `screenshots/test07.png` |
| 8 | Add second product to cart | `POST /api/cart` | `201 Created` | Passed | `screenshots/test08.png` |
| 9 | Update cart item quantity | `PUT /api/cart/:productId` | `200 OK` | Passed | `screenshots/test09.png` |
| 10 | Reject quantity of zero | `PUT /api/cart/:productId` | `400 Bad Request` | Passed | `screenshots/test10.png` |
| 11 | Remove second cart product | `DELETE /api/cart/:productId` | `200 OK` | Passed | `screenshots/test11.png` |
| 12 | Try cart request without token | `POST /api/cart` | `401 Unauthorized` | Passed | `screenshots/test12.png` |
| 13 | Delete product not in cart | `DELETE /api/cart/:productId` | `404 Not Found` | Passed | `screenshots/test13.png` |
| 14 | Add product with missing `productId` | `POST /api/cart` | `400 Bad Request` | Passed | `screenshots/test14.png` |
| 15 | Fetch cart route not implemented | `GET /api/cart` | `404 Not Found` | Passed | `screenshots/test15.png` |
| 16 | Terminal logger evidence | VS Code terminal | Request logs visible | Passed | `screenshots/test16_logger.png` |

## Screenshot Checklist

- Exactly 16 final screenshot files are present in `screenshots/`.
- `screenshots/automated/` is not present.
- Screenshot names follow the required final naming pattern.
- Screenshots 1 through 15 show method, URL, request headers/body where applicable, response status, and formatted JSON response.
- The logger screenshot shows startup output plus request method, route, and status code evidence.

## Final Result

The ShoppyGlobe backend API is functional for the tested authentication, product, cart, validation, unauthorized, and not-found scenarios. The final screenshots provide assignment-ready evidence for the backend API test flow.
