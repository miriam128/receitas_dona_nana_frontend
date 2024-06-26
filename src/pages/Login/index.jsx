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
    setIsLoading(true);
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
      await api.post("/login/", user).then((response) => {
        //adicionar toast de sucesso
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("access_token", response.data.access_token);
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
              <Label className=''>
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

            <div className='d-flex gap-3'>
              <Button
                className="btn btn-secondary btn-block w-100"
                color='primary'
                size="lg"
                type="button"
                href="/register"
                tag="a"
              >
                Criar conta
              </Button>

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
            </div>

          </Form>
        </div>
      </div>
    </>);
}