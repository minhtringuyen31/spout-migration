// src/hooks/useAuth.ts
import { useState } from "react";
import { login as loginService } from "../services/apis/Auth/authService";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await loginService(username, password);
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.refresh);
      setIsAuthenticated(true);
    } catch (err) {
      console.log(err);
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Call API Logout
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
  };

  const checkAuthentication = () => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  };

  return {
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    checkAuthentication,
  };
};

export default useAuth;
