import React from "react";
import Navigationbar from "../layout/Navbar";


import {
  Button,
  Card,
  ListGroup,
  ListGroupItem,
  FloatingLabel,
  Form,
  Col,
  Container,
} from "react-bootstrap";

import emailjs from "emailjs-com";

import Swal from "sweetalert2";
//contact form using emailjs api
const SERVICE_ID = "service_u5veav3";
const TEMPLATE_ID = "template_tf9ghya";
const USER_ID = "7NL7XFwI8NlRWETlR";
const Test = () => {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID).then(
      (result) => {
        console.log(result.text);
        Swal.fire({
          icon: "success",
          title: "Message Sent Successfully",
        });
      },
      (error) => {
        console.log(error.text);
        Swal.fire({
          icon: "error",
          title: "Ooops, something went wrong",
          text: error.text,
        });
      }
    );
    e.target.reset();
  };
  return (
    <div className="App">
      <Navigationbar />
      <div className="banner6">
        <Container>
          <Form onSubmit={handleOnSubmit}>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="contfield">Email</Form.Label>
              <Form.Control
                type="email"
                id="form-input-control-email"
                name="user_email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="contfield">Name</Form.Label>
              <Form.Control
                type="text"
                id="form-input-control-last-name"
                name="user_name"
                placeholder="Enter Your Name"
              />
            </Form.Group>
            <Form.Label className="contfield">Type Your Quires</Form.Label>
            <FloatingLabel controlId="floatingTextarea2" label="Comments">
              <Form.Control
                as="textarea"
                placeholder="Type Your Message....."
                id="form-textarea-control-opinion"
                name="user_message"
                style={{ height: "100px" }}
              />
            </FloatingLabel>
            <Button type="submit" className="btn23" variant="success">
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
};
export default Test;
