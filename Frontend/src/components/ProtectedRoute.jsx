import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";

function ProtectedRoute({ children, roles = [] }) {
  const location = useLocation();
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/articles" replace />;
  }

  return children;
}

export default ProtectedRoute;
