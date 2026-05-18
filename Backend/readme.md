# Vidly Backend API

A RESTful backend API for a video rental application built using Node.js, Express.js, and MongoDB.

The application provides functionality for managing movies, genres, customers, rentals, and user authentication. It demonstrates backend development concepts including REST APIs, authentication, middleware, validation, database integration, and testing.

---

# Features

- User Registration and Authentication
- JWT-based Authorization
- CRUD Operations
- Genre Management
- Movie Management
- Customer Management
- Rental Processing
- MongoDB Integration
- Input Validation
- Error Handling
- Unit and Integration Testing

---

# Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Joi Validation
- Jest Testing Framework

---

# Project Setup

## 1. Clone the Repository

```bash
git clone <your-repository-url>
cd vidly-backend
```

---

## 2. Install Dependencies

Run the following command inside the project folder:

```bash
npm install
```

---

## 3. Install and Run MongoDB

Make sure MongoDB Community Edition is installed and running on your machine.

Default MongoDB connection:

```bash
mongodb://localhost/vidly
```

MongoDB Installation Guide:

https://www.mongodb.com/docs/manual/installation/

---

## 4. Seed the Database

Populate the database with initial data:

```bash
node seed.js
```

---

## 5. Run Tests

Run all unit and integration tests:

```bash
npm test
```

All tests should pass successfully.

---

## 6. Start the Server

Run the application:

```bash
node index.js
```

The server will start on:

```bash
http://localhost:3900
```

Test the API in your browser:

```bash
http://localhost:3900/api/genres
```

If configured correctly, you should see a list of genres.

---

# Environment Variables

For production environments, store sensitive configuration values using environment variables.

## Windows

```bash
set vidly_jwtPrivateKey=yourSecureKey
```

## Mac/Linux

```bash
export vidly_jwtPrivateKey=yourSecureKey
```

---

# API Endpoints

## Genres

| Method | Endpoint |
|--------|----------|
| GET | /api/genres |
| POST | /api/genres |
| PUT | /api/genres/:id |
| DELETE | /api/genres/:id |

---

## Movies

| Method | Endpoint |
|--------|----------|
| GET | /api/movies |
| POST | /api/movies |
| PUT | /api/movies/:id |
| DELETE | /api/movies/:id |

---

## Customers

| Method | Endpoint |
|--------|----------|
| GET | /api/customers |
| POST | /api/customers |
| PUT | /api/customers/:id |
| DELETE | /api/customers/:id |

---

## Rentals

| Method | Endpoint |
|--------|----------|
| GET | /api/rentals |
| POST | /api/rentals |

---

## Users

| Method | Endpoint |
|--------|----------|
| POST | /api/users |

---

## Authentication

| Method | Endpoint |
|--------|----------|
| POST | /api/auth |

---

# Folder Structure

```bash
vidly-backend/
│
├── config/
├── middleware/
├── models/
├── routes/
├── startup/
├── tests/
├── seed.js
├── index.js
├── package.json
└── README.md
```

---

# License

This project is developed for educational and learning purposes.
