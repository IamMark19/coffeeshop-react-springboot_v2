# BrewTopia API - Deliverables

This document summarizes the work done to align the BrewTopia backend with the API specification, including a list of changes and example API calls.

## Summary of Changes

The project involved a significant overhaul of the Spring Boot backend and targeted fixes in the React frontend to ensure correct API consumption.

### Backend Changes:

1.  **Dependencies**: Added `spring-boot-starter-oauth2-client` to `pom.xml` to enable Google OAuth2 authentication.
2.  **Configuration**: Updated `application.properties` to include Google OAuth client credentials.
3.  **DTOs (Data Transfer Objects)**:
    *   Refactored `ProductDto` to include `stock` and variant information.
    *   Created `OrderDto` and `OrderRequestDto` to match the API specification and frontend requirements.
    *   Introduced DTOs for admin-specific functionalities like `InventoryLogDto` and `SalesData`.
4.  **Entities**:
    *   Modified the `Product` entity to include `stock` and a list of `ProductVariant`.
    *   Updated the `Order` and `OrderItem` entities to handle product variants and align with the new DTO structure.
    *   Created a `User` entity and `UserRepository` to store and manage users who log in via Google, which was a critical missing piece.
5.  **Services**:
    *   Created `UserService` to handle the "find or create" logic for users logging in.
    *   Significantly updated `OrderService` to handle the new order creation flow, including product variant selection and stock reduction.
    *   Updated `ProductService` to expose product data as required.
    *   Implemented `AdminService` to provide data for inventory, orders, and sales reports.
6.  **Controllers**:
    *   **`ProductController`**: Endpoints for `GET /api/v1/products` and `GET /api/v1/products/{id}` were corrected.
    *   **`OrderController`**: Endpoints for `POST /api/v1/orders` and `GET /api/v1/orders/{id}` were implemented and fixed.
    *   **`UserController`**: A new `POST /api/v1/users/login` endpoint was created to handle user authentication and creation, which was crucial for connecting the frontend login flow to the backend.
    *   **`AdminController`**: All admin endpoints under `/api/v1/admin/**` were implemented for inventory, orders, and sales.
7.  **Security**:
    *   Implemented `SecurityConfig` to secure all `/api/v1/admin/**` endpoints. These routes now require a valid Google OAuth Bearer token for access.
    *   The `/api/v1/orders` (create order) endpoint was also secured to ensure only authenticated users can place orders.
8.  **Enums**: Corrected the casing of enums (`OrderStatus`, `PaymentMethod`, `DeliOption`) to lowercase to match the values sent by the frontend, resolving serialization issues.

### Frontend Changes:

1.  **Authentication Flow**:
    *   The login page (`LoginPage.tsx`) was updated to call the new `/api/v1/users/login` backend endpoint after a successful Google login.
    *   The `AuthProvider.tsx` was fixed to store the authentication token in `localStorage` with the correct key (`coffee-shop-auth-token`).
2.  **API Services**:
    *   The `order.ts` service was updated to correctly retrieve the auth token from `localStorage` and send it as a `Bearer` token in the `Authorization` header for all order-related requests.
    *   A new `user.ts` service was created for the login endpoint.
3.  **Data Models**:
    *   The `types/index.ts` file was updated to reflect the new data structures for orders and users, ensuring type safety between the frontend and backend.
    *   The shopping cart (`useShoppingCart.ts`) was updated to build the correct payload for the new order creation endpoint, including product variant details.

---

## Example API Calls (curl)

**Note**: For secured endpoints, you need to replace `[YOUR_GOOGLE_OAUTH_TOKEN]` with a valid access token obtained from Google.

### Products

**Get All Products**
```bash
curl -X GET http://localhost:8080/api/v1/products
```

**Get Product by ID**
```bash
curl -X GET http://localhost:8080/api/v1/products/1
```

### User Login

**Login or Register a User**
```bash
curl -X POST http://localhost:8080/api/v1/users/login \
-H "Content-Type: application/json" \
-d '{
    "name": "Mark",
    "email": "mark@example.com",
    "googleId": "12345678901234567890"
}'
```

### Orders (Authenticated)

**Create Order**
```bash
curl -X POST http://localhost:8080/api/v1/orders \
-H "Content-Type: application/json" \
-H "Authorization: Bearer [YOUR_GOOGLE_OAUTH_TOKEN]" \
-d '{
    "userId": 1,
    "items": [
        {
            "productId": 1,
            "variantId": 1,
            "quantity": 2
        }
    ],
    "totalPrice": 22.0,
    "deliOption": "delivery",
    "paymentMethod": "cash_on_delivery",
    "deliveryAddress": {
        "street": "123 Main St",
        "city": "Yangon",
        "state": "Yangon",
        "postalCode": "11011",
        "country": "Myanmar"
    }
}'
```

**Get Order by ID**
```bash
curl -X GET http://localhost:8080/api/v1/orders/1 \
-H "Authorization: Bearer [YOUR_GOOGLE_OAUTH_TOKEN]"
```

### Admin - Inventory (Admin Role Required)

**Get Current Stock Levels**
```bash
curl -X GET http://localhost:8080/api/v1/admin/inventory/stock \
-H "Authorization: Bearer [YOUR_GOOGLE_OAUTH_TOKEN]"
```

**Get Low Stock Alerts**
```bash
curl -X GET http://localhost:8080/api/v1/admin/inventory/low-stock \
-H "Authorization: Bearer [YOUR_GOOGLE_OAUTH_TOKEN]"
```

**Get Inventory Adjustments History**
```bash
curl -X GET http://localhost:8080/api/v1/admin/inventory/history \
-H "Authorization: Bearer [YOUR_GOOGLE_OAUTH_TOKEN]"
```

### Admin - Orders (Admin Role Required)

**Get All Orders**
```bash
curl -X GET http://localhost:8080/api/v1/admin/orders \
-H "Authorization: Bearer [YOUR_GOOGLE_OAUTH_TOKEN]"
```

**Get All Orders with Filters**
```bash
curl -X GET "http://localhost:8080/api/v1/admin/orders?status=COMPLETED&startDate=2023-01-01&endDate=2023-12-31" \
-H "Authorization: Bearer [YOUR_GOOGLE_OAUTH_TOKEN]"
```

### Admin - Sales (Admin Role Required)

**Get Daily Sales Report**
```bash
curl -X GET http://localhost:8080/api/v1/admin/sales/daily \
-H "Authorization: Bearer [YOUR_GOOGLE_OAUTH_TOKEN]"
```

**Get Weekly Sales Report**
```bash
curl -X GET http://localhost:8080/api/v1/admin/sales/weekly \
-H "Authorization: Bearer [YOUR_GOOGLE_OAUTH_TOKEN]"
```

**Get Monthly Sales Report**
```bash
curl -X GET http://localhost:8080/api/v1/admin/sales/monthly \
-H "Authorization: Bearer [YOUR_GOOGLE_OAUTH_TOKEN]"
```
