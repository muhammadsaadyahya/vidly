import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import Movies from "./components/Movies";
import NavBar from "./components/navBar";
import Customers from "./components/Customers";
import CustomersForm from "./components/CustomersForm";
import Rental from "./components/Rental";
import RentalForm from "./components/RentalForm";
import NotFound from "./components/notFound";
import MovieForm from "./components/MovieForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import Register from "./components/registerForm";
import auth from "./services/authService";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Profile from "./components/profile";

import "./App.css";
import ProtectedRoute from "./components/common/protectedRoute";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    const userCopy = auth.getCurrentUser();
    setUser(userCopy);
  }, []);

  return (
    <div>
      <NavBar user={user} />
      <ToastContainer></ToastContainer>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/Movies" element={<Movies user={user} />} />
        <Route
          path="/Movies/:id"
          element={user ? <MovieForm /> : <ProtectedRoute />}
        />

        <Route path="/Customers" element={<Customers user={user} />} />
        <Route
          path="/Customers/:id"
          element={user ? <CustomersForm /> : <ProtectedRoute />}
        />

        <Route path="/Rental" element={<Rental user={user} />} />
        <Route path="/Rental/new" element={<RentalForm />} />

        <Route path="/profile" element={<Profile user={user} />} />

        <Route path="/not-found" element={<NotFound />} />
        <Route path="/" index element={<Navigate to="/Movies" />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </div>
  );
}

export default App;
