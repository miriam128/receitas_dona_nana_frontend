import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import PrivateRoute from "./services/auth"
import Login from "./pages/Login"
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;