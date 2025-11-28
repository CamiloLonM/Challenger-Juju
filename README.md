# Book Management System API

API built with **Node.js + Express + MongoDB** that exposes endpoints for managing books and users.  
Includes controllers, custom error handling, JWT authentication, search, pagination, and auditing. Fully documented with Swagger.

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/mongodb-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white)

---

## Features

- **Book Management**
  - Create, list (with pagination, filters, and sorting), get details, update, and delete books.
- **User Management**
  - Register and login using JWT.
- **Search & Filtering**
  - Search books by title or author.
- **Security**
  - Only authenticated users can create, update, or delete books.
- **Auditing**
  - Logs critical actions in the database (user registration, login, book CRUD operations).
- **API Documentation**
  - Swagger UI available at `/api/{version}/docs`.

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/book-management-api.git
cd book-management-api
```

2. Install dependencies:

```
npm install
```

3. Create a .env file in the root directory with the following variables:

```
PORT=8080
API_VERSION=v1
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the development server:

```
npm run dev
The API will run on http://localhost:8080.
```

---

## Error Handling

Custom errors include status and message for clarity.
Middleware errorHandler returns structured JSON:

```
{
  "status": "error",
  "message": "Detailed error message here"
}
```

## Pagination & Filtering

```
Endpoints like GET /books accept query parameters:

page – page number (default: 1)

limit – items per page (default: 10)

search – search by title or author

sort – field to sort by (default: createdAt)

order – asc or desc (default: desc)

Invalid pagination parameters return HTTP 400.
```

## Swagger Documentation

```
Swagger UI is available at:

http://localhost:"PORT"/api/v1/docs

Use it to explore endpoints, see request/response examples, and test the API interactively.
```
