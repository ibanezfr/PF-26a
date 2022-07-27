import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loading from "../Loading/Loading";

const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  if (!user) return <Redirect to="/login" />;

  return <>{children}</>;
};
export default ProtectedRoutes;
