import { useState } from "react";
import AuthenticatedLayout from "../../components/AuthenticatedLayout";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import FroalaEditorComponent from 'react-froala-wysiwyg';
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./style.css";

export default function RecipeCreate(){

  const navigate = useNavigate();
  
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    ingredients: "",
    preparationMethod: "",
    image: null
  });

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
    formData.append("preparationMethod", recipe.preparationMethod);
    if (recipe.image) {
      formData.append("image", recipe.image);
    }

    try {
      await api.post('recipe/create/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        navigate("/");
      });
    } catch (e) {
      console.log(e);
    }
  }

  return(
    <AuthenticatedLayout>
      <div className="inner-container">
        <p className="title">Cadastrar Nova Receita</p>
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
            <FroalaEditorComponent tag='textarea' config={optionsFroala} model={recipe.preparationMethod} onModelChange={preparationMethod => setRecipe({ ...recipe, preparationMethod })} />
          </FormGroup>

          <FormGroup>
            <Label for="image-input">
              Imagem
            </Label>
            <Input id="image-input" name="image" type="file" onChange={onFileChange} />
          </FormGroup>

          <div className="w-100 d-flex justify-content-center mt-4">
            <Button className="btn btn-primary btn-block" color='primary' type="submit">Cadastrar</Button>
          </div>
        </Form>
      </div>
     

    </AuthenticatedLayout>
  )
}