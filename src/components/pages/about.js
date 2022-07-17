import React from "react";
import Navigationbar from "../layout/Navbar";
import signupp from "../images/singupp.png";
import barcode from "../images/barcodescanner.jpg";
import { Image, ListGroup, Container } from "react-bootstrap";
//about page
function About() {
  return (
    <div className="banner5">
      <Navigationbar />
      <div className=" container-fluid">
        <h4>Prerequisites for using this Application</h4>

        <ListGroup variant="light" id="list">
          <ListGroup.Item>
            <span>*</span>Barcode Scanner
          </ListGroup.Item>
          <ListGroup.Item>
            <span>*</span>Email Id{" "}
          </ListGroup.Item>
          <ListGroup.Item>
            <span>*</span>Bank Account to Receive Payments Via UPI
          </ListGroup.Item>
        </ListGroup>
        <h4>How to Use this?</h4>
        <ListGroup variant="light" id="list">
          <ListGroup.Item>
            SignUp using Your Email , Password , Account Number , IFSC code{" "}
          </ListGroup.Item>
        </ListGroup>
        <Container>
          <Image className="container" id="try" src={signupp}></Image>
        </Container>
        <ListGroup variant="light" id="list">
          <ListGroup.Item>
            Connect the Barcode Scanner Via USB and Generate Your Invoices{" "}
          </ListGroup.Item>
        </ListGroup>
        <hr />

        <h4>To Buy a Barcode Scanner (Click Here 👇️): </h4>
        <Container>
          <a href="https://amzn.to/36VIg5v" target="_blank">
            <img src={barcode} id="try" className="imgg" />
          </a>
        </Container>

        <br />
        <br />
      </div>
    </div>
  );
}

export default About;
