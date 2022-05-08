// import React from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom"; // v5: userHistory v6: useNavigate

import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const LoginForm = () => {
  // Context 
  const {loginUser} = useContext(AuthContext)

  // Router
  // const history = useHistory(); v5
  const navigate = useNavigate();

  // Local State
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginForm; // Destructure

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async event => {
    event.preventDefault();
    
    try {
      const loginData = await loginUser(loginForm)
      // console.log(loginData)
      if(loginData.success){
        // history.push('/dashboard') // v5: history
        navigate('/dashboard') // v5: history
      }else{

      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Form className="my-4" onSubmit={login}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button variant="success" type="submit" className="mb-3">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account?{" "}
        <Link to="/register">
          <Button variant="info" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
