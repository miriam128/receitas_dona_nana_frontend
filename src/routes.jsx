import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import PrivateRoute from "./services/auth"
import Login from "./pages/Login"
import Home from './pages/Home';
import Register from './pages/Register';
import Recipe from './pages/Recipe';
import RecipeEdit from './pages/RecipeEdit';
import RecipeCreate from './pages/RecipeCreate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/recipe/:recipeId" element={<Recipe />} />
          <Route exact path="/recipe/:recipeId/edit" element={<RecipeEdit />} />
          <Route exact path="/recipe/create" element={<RecipeCreate />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;