import { useEffect, useState } from "react";
import AuthenticatedLayout from "../../components/AuthenticatedLayout";
import api from '../../services/api';
import defaultImageRecipe from '../../assets/images/bolo-morango.webp'
import { useParams } from "react-router-dom";
import "./style.css"
import { Button } from "reactstrap";
import DOMPurify from 'dompurify';
import DeleteButton from "../../components/DeleteButton";

export default function RecipeEdit(){
  let params = useParams();
  const [recipe, setRecipe] = useState({id:0, title:"", image: {name:"", url:""}, description:"", ingredients:"", preparation_method:""});
  const [recipeImage, setRecipeImage] = useState(defaultImageRecipe);

  useEffect(() => {
    api
    .get(`/recipe/${params.recipeId}/show/`)
    .then((response) => {
      console.log(response);
      setRecipe(response.data.recipe);
    })
    .catch((err) => {

    });

  }, []);

  return (
    <AuthenticatedLayout>
      <div className="recipe-details-container">
        <div className="d-flex gap-5 mb-3">
          <Button onClick={() => window.location.href = `/recipe/${recipe.id}`}>Visualizar</Button>
          <DeleteButton recipeId={recipe.id} />
        </div>
        
        <p className="recipe-title">{recipe.title.toUpperCase()}</p>
        <img className="recipe-details-image" src={recipe.image ? recipe.image.url : defaultImageRecipe}/>
        <p className="mt-2 recipe-details-description">{recipe.description}</p>
        <p className="recipe-ingredients-title">INGREDIENTES</p>
        <div className="recipe-ingredients" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(recipe.ingredients) }}></div>

        <p className="recipe-method-title">MODO DE PREPARO</p>
        <div className="recipe-ingredients" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(recipe.preparation_method) }}></div>
      </div> 
    </AuthenticatedLayout>
  );
}