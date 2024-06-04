import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";

// verifica se tem o token em local storage retornando a página correta ou redireciona para login
function Auth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  useEffect(() => {
    checkAuth();
  }, [accessToken, refreshToken]);

  const checkAuth = async () => {
    

    if (!accessToken || !refreshToken) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        const response = await api.post("/api/token/refresh/", {
          refresh: refreshToken,
        });
        localStorage.setItem("access_token", response.data.access);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Failed to verify token", error);
      setIsAuthenticated(false);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default Auth;