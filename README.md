# Book Management System API

A RESTful API for managing books and users, developed with **Node.js**, **Express**, and **MongoDB** (or SQL Server).  
This system allows users to create, edit, delete, and view books. The API is the core of the system, enabling interaction with a database of books. Authenticated users can perform all CRUD operations, while critical actions are logged for traceability. A simple web interface (React or Angular) can be used to interact with the API.

---

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/mongodb-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%23007FFF.svg?style=for-the-badge)

---

## Features

- **Book Management**
  - Create, list (with pagination, filters, and sorting), get details, update, and delete books.
- **UI**.
  - Web interface with React and Material
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

## Tecnologías

- Backend: Node.js, Express, Mongoose (MongoDB), JWT.
- Frontend: React, Material UI, React Hook Form, Axios.
- Documentación: Swagger.

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
