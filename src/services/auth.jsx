import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../services/api";

// verifica se tem o token em local storage retornando a página correta ou redireciona para login
function Auth() {
  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("userEmail");
  const [tokenAtual, setTokenAtual] = useState(token);

  useEffect(() => {
    api
      .post(`/token-check`, {
        userEmail,
      })
      .then((response) => {
        setTokenAtual(response.data.tokenAtual);
      })

      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (token === null || tokenAtual !== token) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
}

export default Auth;
