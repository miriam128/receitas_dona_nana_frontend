import { useEffect, useState } from "react";
import AuthenticatedLayout from "../../components/AuthenticatedLayout";
import api from '../../services/api';
import { useParams, useNavigate } from "react-router-dom";
import "./style.css"
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import DeleteButton from "../../components/DeleteButton";
import FroalaEditorComponent from 'react-froala-wysiwyg';

export default function RecipeEdit(){

  const navigate = useNavigate();

  let params = useParams();
  const [recipe, setRecipe] = useState({
    id: 0,
    title: "",
    description: "",
    ingredients: "",
    preparation_method: "",
    image: null
  });

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

  function onChange(event) {
    const { value, name } = event.target;

    setRecipe({
      ...recipe,
      [name]: value,
    });
  }
  
  function onFileChange(event) {
    setRecipe({
      ...recipe,
      image: event.target.files[0],
    });
  }

  const optionsFroala = {
    pluginsEnabled: ['lists'], // Habilita o plugin de listas
    toolbarButtons: ['bold', 'italic', 'underline', 'formatUL'], // Adiciona botões para listas não ordenadas (UL) e ordenadas (OL) na barra de ferramentas
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", recipe.title);
    formData.append("description", recipe.description);
    formData.append("ingredients", recipe.ingredients);
    formData.append("preparation_method", recipe.preparation_method);
    if (recipe.image) {
      formData.append("image", recipe.image);
    }

    try {
      await api.put(`recipe/${params.recipeId}/edit/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        navigate(`/recipe/${params.recipeId}`);
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <AuthenticatedLayout>
      <div className="inner-container">
        <div className="w-100 justify-content-center d-flex gap-5 mb-3">
          <Button onClick={() => window.location.href = `/`}>Receitas</Button>
          <Button onClick={() => window.location.href = `/recipe/${recipe.id}`}>Visualizar</Button>
          <DeleteButton recipeId={recipe.id} />
        </div>
        <p className="title">Editar Receita</p>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Título</Label>
            <Input name="title" value={recipe.title} onChange={onChange} />
          </FormGroup>

          <FormGroup>
            <Label>Descrição</Label>
            <Input name="description" value={recipe.description} onChange={onChange} />
          </FormGroup>

          <FormGroup>
            <Label>Ingredientes</Label>
            <FroalaEditorComponent tag='textarea' config={optionsFroala} model={recipe.ingredients} onModelChange={ingredients => setRecipe({ ...recipe, ingredients })} />
          </FormGroup>

          <FormGroup>
            <Label>Modo de preparo</Label>
            <FroalaEditorComponent tag='textarea' config={optionsFroala} model={recipe.preparation_method} onModelChange={preparation_method => setRecipe({ ...recipe, preparation_method })} />
          </FormGroup>

          <FormGroup>
            <Label for="image-input">
              Imagem
            </Label>
            <Input id="image-input" name="image" type="file" onChange={onFileChange} />
          </FormGroup>

          <div className="w-100 d-flex justify-content-center mt-4">
            <Button className="btn btn-primary btn-block" color='primary' type="submit">Salvar</Button>
          </div>
        </Form>
      </div> 
    </AuthenticatedLayout>
  );
}