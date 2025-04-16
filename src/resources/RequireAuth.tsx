// src/components/RequireAuth.tsx
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin-login" />;
}
