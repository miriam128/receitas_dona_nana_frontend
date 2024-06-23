import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";

// verifica se tem o token em local storage retornando a página correta ou redireciona para login
function Auth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  useEffect(() => {
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
          console.log(response)
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Failed to verify token", error);
        setIsAuthenticated(false);
       
      }
    };

    checkAuth();
  }, [accessToken, refreshToken]);

  if (isAuthenticated === null) {
    return;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default Auth;