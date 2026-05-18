# Vidly - Full Stack Video Rental Application

Vidly is a full stack video rental application developed using the MERN stack.  
The project consists of a React frontend and a Node.js + Express backend connected with MongoDB.

The application allows users to browse movies, manage rentals, authenticate users, and perform CRUD operations through a responsive web interface and RESTful APIs.

---

# Project Structure

```bash
vidly/
│
├── frontend/     # React Frontend
├── backend/      # Node.js Backend API
└── README.md
```

---

# Features

## Frontend Features

- User Authentication
- Movie Listings
- Genre Filtering
- Search and Pagination
- Protected Routes
- Responsive User Interface
- API Integration

---

## Backend Features

- RESTful APIs
- JWT Authentication & Authorization
- CRUD Operations
- MongoDB Database Integration
- Middleware Handling
- Input Validation
- Error Handling
- Unit & Integration Testing

---

# Tech Stack

## Frontend

- React.js
- React Router
- Axios
- Bootstrap / CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Joi Validation
- Jest Testing

---

# Prerequisites

Make sure the following are installed on your system:

- Node.js
- npm
- MongoDB Community Edition

MongoDB Installation Guide:

https://www.mongodb.com/docs/manual/installation/

---

# Installation

## 1. Clone the Repository

```bash
git clone <your-repository-url>
cd vidly
```

---

# Backend Setup

## Navigate to Backend Folder

```bash
cd backend
```

## Install Backend Dependencies

```bash
npm install
```

## Seed the Database

```bash
node seed.js
```

## Start Backend Server

```bash
node index.js
```

Backend server runs on:

```bash
http://localhost:3900
```

Test API endpoint:

```bash
http://localhost:3900/api/genres
```

---

# Frontend Setup

## Navigate to Frontend Folder

```bash
cd frontend
```

## Install Frontend Dependencies

```bash
npm install
```

## Start Frontend Server

```bash
npm start
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# Running Tests

## Backend Tests

```bash
cd backend
npm test
```

## Frontend Tests

```bash
cd frontend
npm test
```

---

# Environment Variables

For production environments, configure secure environment variables.

## Windows

```bash
set vidly_jwtPrivateKey=yourSecureKey
```

## Mac/Linux

```bash
export vidly_jwtPrivateKey=yourSecureKey
```

---

# API Modules

- Authentication
- Users
- Movies
- Genres
- Customers
- Rentals

---

# Folder Structure

```bash
vidly/
│
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   ├── seed.js
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

# Future Improvements

- Payment Integration
- Movie Reviews & Ratings
- Admin Dashboard
- Docker Deployment
- Cloud Database Hosting
- CI/CD Pipeline

---

# License

This project is developed for educational and learning purposes.
