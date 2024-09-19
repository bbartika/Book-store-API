# Bookstore API

## Overview

The Bookstore API is a RESTful service built with Express.js and Sequelize, allowing users to manage a collection of books, manage their carts, and place orders. This README provides setup instructions, API endpoint details, and usage information.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
  - [Books API](#books-api)
  - [Cart API](#cart-api)
  - [Orders API](#orders-api)
  - [Authentication API](#authentication-api)

# Installation

### Steps

1. **Clone the Repository**

```bash
git clone https://github.com/ashishkumar082018/bookstore-api.git
cd bookstore-api
```

2. **Install Dependencies**

```bash
npm install
```

3. **Set Up the Database**

   1. Create a new database in MySQL.
   2. Update the database configuration in config/database.js with your database credentials.

4. **Create Environment Variables**

   Create a .env file in the root directory and add the following:

```bash
DB_NAME=bookstore
DB_USER=root
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_DIALECT=mysql
JWT_SECRET=your_jwt_secret
```

5.  **Start the Server**

```bash Copy code
npm start
```

The server will run on http://localhost:3000.

# Environment Variables

- `PORT`: 3000
- `DB_NAME`: bookstore-api
- `DB_USER`: root
- `DB_PASSWORD`: password
- `DB_HOST`: localhost
- `DB_DIALECT`: mysql
- `JWT_SECRET`: Secret

## Database Schema

The schema includes the following tables:

- Users
- Books
- Carts
- CartItems
- Orders
- OrderItems

Refer to the `schema.sql` file in this repository for the complete database schema.

# API Endpoints

## Books API

1. **List All Books**

   **Method** : GET  
   **Endpoint** : `/api/books`  
   **Headers** : None  
   **Body** : None

2. **Get a Specific Book Detail by Id**

   **Method** : GET  
   **Endpoint** : `/api/books/:id`  
   **Headers** : None  
   **Body** : None

## Cart API

1. **Get cart details for the authenticated user**

   **Method** : GET  
   **Endpoint**: `/api/cart`  
   **Headers**: `Authorization: Bearer <token>`  
   **Body**: None

2. **Add a Book to the Cart (Only by Authorized User)**

   **Method** : POST  
   **Endpoint**: `/api/cart`  
   **Headers**: `Authorization: Bearer <token>`  
   **Body**:

```json
{
  "bookId": 1,
  "quantity": 2
}
```

3. **Remove a Book from the Cart**

   **Method** : DELETE  
   **Endpoint** : `/api/cart/:itemId`  
   **Headers** : `Authorization: Bearer <token>`  
   **Body** :

```json
{
  "quantity": 1
}
```

## Orders API

1. **Place an Order**    
   **Method** : POST  
   **Endpoint**: ` /api/orders`  
   **Headers**: `Authorization: Bearer <token>` 
   **Body**: None




## Authentication API

1. **Register a New User**

   **Method** : POST  
   **Endpoint** : `/api/auth/register`  
   **Headers** : None  
   **Body** :

```json
{
  "username": "user123",
  "password": "password123"
}
```

2. **Login a User**

   **Method** : POST  
   **Endpoint** : `/api/auth/login`  
   **Headers** : None  
   **Body** :

```json
{
  "username": "user123",
  "password": "password123"
}
```

3. **Get Order History**

   **Method** : GET  
   **Endpoint**: `/api/orders`  
    **Headers** : `Authorization: Bearer <token>`  
    **Body**: None

4. **Get Order Details**

   **Method** : GET  
   **Endpoint**: `/api/orders/:id`  
    **Headers** : `Authorization: Bearer <token>`  
    **Body**: None
