import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../../components/misc/ErrorNotice";
import {
  Container,

  Form,
  Button,
  Row,
  Col
} from "react-bootstrap";
import Navigationbar from "../layout/Navbar";

function Register() {
  //getting email , password , shopname , account_number , ifsc , name using useState()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [Account_number, setAccno] = useState();
  const [IFSC_CODE, setIfsc] = useState();
  const [Name, setName] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, displayName, Account_number , IFSC_CODE ,Name };
      await axios.post("http://localhost:5000/users/register", newUser);
      const loginResponse = await axios.post(
        "http://localhost:5000/users/login",
        {
          email,
          password,
        }
      );
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div>
      <Navigationbar />
      <section className="banner11">
        <Container>
          {error && (
            <ErrorNotice
              message={error}
              clearError={() => setError(undefined)}
            />
          )}
          <Form onSubmit={submit}>
            <Row className="mb-1200 d-flex">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            </Row>
            <br />
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setPasswordCheck(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Shop Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Shop Name"
                  id="dsplay-name"
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3 col-6">
              <Form.Group as={Col} controlId="formFile" className="mb-3">
                <Form.Label>Enter Your Account_number</Form.Label>
                <Form.Control type="number" onChange={(e) => setAccno(e.target.value)} />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Enter Bank IFSC code</Form.Label>
              <Form.Control  type="text" onChange={(e) => setIfsc(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Account Holder Name</Form.Label>
              <Form.Control  type="text" onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Button
              variant="light"
              type="submit"
              className="rbtn1"
              value="Register"
            >
              Register
            </Button>
          </Form>
        </Container>
      </section>
    </div>
  );
  
}

export default Register;
