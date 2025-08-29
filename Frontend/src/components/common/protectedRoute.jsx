import { Navigate, useLocation } from "react-router-dom";

import auth from "../../services/authService";

const ProtectedRoute = ({ element, ...rest }) => {
  const location = useLocation();
  const guardedElement = auth.getCurrentUser() ? (
    element
  ) : (
    <Navigate state={{ from: location }} to="/login" replace />
  );
  return guardedElement;
};

export default ProtectedRoute;
