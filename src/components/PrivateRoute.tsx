
import { Navigate } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { UserRole } from "@/types";

interface PrivateRouteProps {
  children: React.ReactNode;
  roles?: UserRole[];
}

const PrivateRoute = ({ children, roles }: PrivateRouteProps) => {
  const { currentUser } = useData();

  if (!currentUser) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // Check if the user has the required role
  if (roles && !roles.includes(currentUser.role)) {
    // User doesn't have the required role, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // User is authenticated and has the required role, render children
  return <>{children}</>;
};

export default PrivateRoute;
