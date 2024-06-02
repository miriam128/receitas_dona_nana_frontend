import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./style.css"
import api from '../../services/api';

export default function Login() {

  const [user, setUser] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [desabilitaBotao, setDesabilitaBotao] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setLoading(true);
  };

  function validateForm() {
    return user.username.length > 0 && user.password.length > 0;
  }

  function onChange(event) {
    const { value, name } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    setDesabilitaBotao(true);
    event.preventDefault();
    try {
      await api.post("/login", user).then((response) => {
        //adicionar toast de sucesso
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("access_token", JSON.stringify(response.data.access_token));
        localStorage.setItem("refresh_token", response.data.refresh_token);
        navigate("/");
      });
    } catch (e) {
      //adicionar toast de erro
      setDesabilitaBotao(false);
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="pink-background">
        <div className="login-white-container">
          <h4>Login</h4>
          <Form className="w-100" onSubmit={handleSubmit}>
            <FormGroup className="">
              <Label>
                Nome de usuário
              </Label>
              <Input
                name="username"
                type="text"
                onChange={onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>
                Senha
              </Label>
              <Input
                name="password"
                type="password"
                onChange={onChange}
              />
            </FormGroup>

            <Button
              className="btn btn-primary btn-block w-100"
              color='primary'
              size="lg"
              type="submit"
              disabled={!validateForm() || desabilitaBotao}
              onClick={!isLoading ? handleClick : null}
            >
              {isLoading ? "Carregando…" : "Avançar"}
            </Button>
          </Form>
        </div>
      </div>
    </>);
}