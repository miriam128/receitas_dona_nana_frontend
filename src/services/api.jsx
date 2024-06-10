import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL:  import.meta.env.VITE_API_URL,
});

// Intercept request to add the authorization token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');

  // Check if the request URL does not include /login
  if (token && !config.url.includes('/login')) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Intercept response to handle token expiration
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        try {
          const { data } = await api.post('/api/token/refresh/', { refresh: refreshToken });
          localStorage.setItem('access_token', data.access);
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          
          return api(originalRequest);
        } catch (err) {
          console.error('Failed to refresh token', err);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login'; // Redirecionar para a página de login
          return Promise.reject(error); // Adicionar esta linha para garantir que o erro seja rejeitado após o redirecionamento
        }
      } else {
        window.location.href = '/login'; // Redirecionar para a página de login
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
