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
import RecipeEdit from './pages/RecipeEdit';
import RecipeCreate from './pages/RecipeCreate';
import RecipeView from './pages/RecipeView';
import Logout from "./pages/Logout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/logout" element={<Logout />} />

        <Route element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/recipe/:recipeId" element={<RecipeView />} />
          <Route exact path="/recipe/:recipeId/edit" element={<RecipeEdit />} />
          <Route exact path="/recipe/create" element={<RecipeCreate />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;