import { useEffect, useState } from "react";
import AuthenticatedLayout from "../../components/AuthenticatedLayout";
import api from '../../services/api';
import defaultImageRecipe from '../../assets/images/bolo-morango.webp'
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

export default function Home(){

  const [recipes, setRecipes] = useState([]);
  const [recipeImage, setRecipeImage] = useState(defaultImageRecipe);

  useEffect(() => {
    api
    .get("/recipe/index/")
    .then((response) => {
      console.log(response);
      setRecipes(response.data.recipes);
    })
    .catch((err) => {

    });

  }, []);

  return (
    <AuthenticatedLayout>
      <div className="recipe-details-container">
        <Button onClick={() => window.location.href = `/recipe/create`}>Cadastrar receita</Button>
        <div>
          {recipes.map((recipe) => (
              <div className="recipe-container">
                <p className="recipe-title mt-2">{recipe.title.toUpperCase()}</p>
                <Link to={"/recipe/"+recipe.id} className="text-decoration-none d-flex justify-content-center">
                  <img className="recipe-details-image" src={recipe.image_url ? recipe.image_url : defaultImageRecipe} title="Clique para editar"/>
                </Link>
                <p className="mt-2 recipe-description">{recipe.description}</p>
              </div> 
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}