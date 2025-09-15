# BrewTopia API Documentation

This document provides a detailed description of the BrewTopia API endpoints.

## Authentication

Authentication is handled via Google OAuth. The frontend is responsible for obtaining an OAuth token and sending it to the backend for verification.

---

## Products

### Get All Products

*   **Method**: `GET`
*   **URL**: `/api/v1/products`
*   **Description**: Retrieves a list of all available products.
*   **Response**:
    ```json
    [
      {
        "id": 1,
        "name": "Iced Coffee",
        "description": "A refreshing iced coffee.",
        "price": 3.50,
        "imageUrl": "/images/coffee/iced-coffee.jpg"
      }
    ]
    ```

### Get Product by ID

*   **Method**: `GET`
*   **URL**: `/api/v1/products/{id}`
*   **Description**: Retrieves a single product by its ID.
*   **Parameters**:
    *   `id` (number): The ID of the product.
*   **Response**:
    ```json
    {
      "id": 1,
      "name": "Iced Coffee",
      "description": "A refreshing iced coffee.",
      "price": 3.50,
      "imageUrl": "/images/coffee/iced-coffee.jpg"
    }
    ```

---

## Admin - Inventory

These endpoints are for admin users only and require authentication.

### Get Current Stock Levels

*   **Method**: `GET`
*   **URL**: `/api/v1/admin/inventory/stock`
*   **Description**: Retrieves the current stock levels for all products.
*   **Response**: A list of `ProductDto` objects.

    **ProductDto Structure**:
    ```json
    {
      "id": "number",
      "name": "string",
      "description": "string",
      "price": "number",
      "stock": "number"
    }
    ```

### Get Low Stock Alerts

*   **Method**: `GET`
*   **URL**: `/api/v1/admin/inventory/low-stock`
*   **Description**: Retrieves a list of products that are low in stock.
*   **Response**: A list of `ProductDto` objects.

### Get Inventory Adjustments History

*   **Method**: `GET`
*   **URL**: `/api/v1/admin/inventory/history`
*   **Description**: Retrieves the history of inventory adjustments.
*   **Response**: A list of `InventoryLogDto` objects.

    **InventoryLogDto Structure**:
    ```json
    {
      "id": "number",
      "productId": "number",
      "productName": "string",
      "changeAmount": "number",
      "updatedAt": "string (date-time)"
    }
    ```

---

## Admin - Orders

These endpoints are for admin users only and require authentication.

### Get All Orders

*   **Method**: `GET`
*   **URL**: `/api/v1/admin/orders`
*   **Description**: Retrieves a list of all orders, with optional filtering.
*   **Query Parameters**:
    *   `status` (string, optional): Filter by order status (e.g., `PENDING`, `COMPLETED`).
    *   `startDate` (string, optional): Filter by start date (format: `YYYY-MM-DD`).
    *   `endDate` (string, optional): Filter by end date (format: `YYYY-MM-DD`).
    *   `customerId` (number, optional): Filter by customer ID.
*   **Response**: A list of `OrderDto` objects.

    **OrderDto Structure**:
    ```json
    {
      "id": "number",
      "userId": "number",
      "customerName": "string",
      "orderDate": "string (date-time)",
      "status": "string",
      "total": "number",
      "orderItems": [
        {
          "id": "number",
          "productId": "number",
          "productName": "string",
          "quantity": "number",
          "price": "number"
        }
      ]
    }
    ```

---

## Admin - Sales

These endpoints are for admin users only and require authentication.

### Get Daily Sales Report

*   **Method**: `GET`
*   **URL**: `/api/v1/admin/sales/daily`
*   **Description**: Retrieves a sales report for the current day.
*   **Response**: A list of `SalesData` objects.

    **SalesData Structure**:
    ```json
    {
      "date": "string (date)",
      "totalSales": "number",
      "totalOrders": "number"
    }
    ```

### Get Weekly Sales Report

*   **Method**: `GET`
*   **URL**: `/api/v1/admin/sales/weekly`
*   **Description**: Retrieves a sales report for the current week.
*   **Response**: A list of `SalesData` objects.

### Get Monthly Sales Report

*   **Method**: `GET`
*   **URL**: `/api/v1/admin/sales/monthly`
*   **Description**: Retrieves a sales report for the current month.
*   **Response**: A list of `SalesData` objects.

## Orders

### Create Order

*   **Method**: `POST`
*   **URL**: `/api/v1/orders`
*   **Description**: Creates a new order.
*   **Request Body**:
    ```json
    {
      "userId": 1,
      "items": [
        {
          "productId": 1,
          "quantity": 2
        }
      ],
      "totalPrice": 7.00,
      "status": "PENDING"
    }
    ```
*   **Response**:
    ```json
    {
      "id": 1,
      "userId": 1,
      "items": [
        {
          "productId": 1,
          "quantity": 2
        }
      ],
      "totalPrice": 7.00,
      "status": "PENDING"
    }
    ```

### Get Order by ID

*   **Method**: `GET`
*   **URL**: `/api/v1/orders/{id}`
*   **Description**: Retrieves a single order by its ID.
*   **Parameters**:
    *   `id` (number): The ID of the order.
*   **Response**:
    ```json
    {
      "id": 1,
      "userId": 1,
      "items": [
        {
          "productId": 1,
          "quantity": 2
        }
      ],
      "totalPrice": 7.00,
      "status": "PENDING"
    }
    ```
