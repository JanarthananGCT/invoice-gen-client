import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../../components/misc/ErrorNotice";
import { Container, Form, Button } from "react-bootstrap";

import Navigationbar from "../layout/Navbar";
function Login() {
  //getting email and password using useState()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      //sending response
      const loginResponse = await axios.post(
        "http://localhost:5000/users/login",
        loginUser
      );
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);
      history.push("/invoice");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div>
      <Navigationbar />
      <section className="banner1">
        <Container>
          {error && (
            <ErrorNotice
              message={error}
              clearError={() => setError(undefined)}
            />
          )}
          <Form className="form" onSubmit={submit}>
            <Form.Group className="mb-3 email" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3 " controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3 love" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button
              className="love btn2"
              type="submit"
              variant="light"
              value="Login"
            >
              LogIn
            </Button>
            <br />
            <br />
            <Form.Group className="mb-3 " controlId="formBasicPassword">
              <Form.Label>Didn't Have an Account?</Form.Label>
              <Button
                href="/signup"
                className="love btn2 pd1"
                variant="light"
                type="submit"
              >
                SignUp
              </Button>
            </Form.Group>
          </Form>
        </Container>
      </section>
    </div>
  );
}

export default Login;
