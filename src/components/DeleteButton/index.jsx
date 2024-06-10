import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import api from '../../services/api';

export default function DeleteButton(params){
  const navigate = useNavigate();

  async function handleClick(event){
    event.preventDefault();
    try {
      await api.delete(`/recipe/${params.recipeId}/delete/`)
      .then((response) => {
        navigate("/");
      });
    } catch (e) {
      console.log(e);
    }
  }
  return( <Button onClick={handleClick}>Excluir</Button>)
}