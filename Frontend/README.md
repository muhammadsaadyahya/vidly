# Vidly Frontend

A modern frontend application for the Vidly video rental platform built using React.js.

The frontend allows users to browse movies, manage rentals, authenticate accounts, and interact with the Vidly backend API through a responsive and user-friendly interface.

---

# Features

- User Authentication
- Movie Listings
- Genre Filtering
- Search Functionality
- Pagination
- Protected Routes
- Responsive UI
- API Integration
- Form Validation
- Client-side Routing

---

# Tech Stack

- React.js
- React Router
- Axios
- Bootstrap / CSS
- JWT Authentication
- REST API Integration

---

# Project Setup

## 1. Clone the Repository

```bash
git clone <your-repository-url>
cd vidly-frontend
```

---

## 2. Install Dependencies

Run the following command inside the project folder:

```bash
npm install
```

---

## 3. Configure Backend API

Make sure the Vidly backend server is running.

Default backend URL:

```bash
http://localhost:3900/api
```

---

# Running the Application

Start the React development server:

```bash
npm start
```

The application will run on:

```bash
http://localhost:3000
```

The page will automatically reload when changes are made.

---

# Building for Production

Create an optimized production build:

```bash
npm run build
```

The production-ready files will be generated inside the `build` folder.

---

# Running Tests

Run frontend tests:

```bash
npm test
```

---

# Folder Structure

```bash
vidly-frontend/
│
├── public/
├── src/
│   ├── components/
│   ├── services/
│   ├── common/
│   ├── utils/
│   ├── App.js
│   └── index.js
│
├── package.json
└── README.md
```

---

# Main Functionalities

## Authentication

- User Login
- User Registration
- JWT Token Handling
- Protected Routes

---

## Movies

- Display Movies
- Add Movies
- Edit Movies
- Delete Movies
- Filter by Genre

---

## Rentals

- Rent Movies
- View Rental Information

---

# API Integration

The frontend communicates with the backend REST API for:

- Authentication
- Movies Data
- Genres Data
- Customers Data
- Rentals Management

---

# Available Scripts

| Command | Description |
|----------|-------------|
| npm start | Runs the app in development mode |
| npm test | Runs test cases |
| npm run build | Creates production build |
| npm run eject | Ejects CRA configuration |

---

# License

This project is developed for educational and learning purposes.
