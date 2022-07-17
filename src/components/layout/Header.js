import React, { Component } from "react";

import { Container, Row } from "react-bootstrap";
import Navigationbar from "./Navbar";
//home page
class Header extends Component {
  render() {
    return (
      <header>
        <Navigationbar />
        <section className="banner">
          <Container>
            <Row>
              <div className="col-sm-9 pad">
                <h2>
                  <b>G</b>enerate  Your  Bills ,
                </h2>
                <p>
                  This Web Application provides you a platform to generate bills
                  . You can signup with your Email and password.Web Application
                  is created using MangoDb , JWS Web Token , React , Bootstrap ,
                  Node , React Barcode Reader . Connect Barcode Scanner vis USB
                  and Scan the product Barcode and Generate bills . generate
                  Barcode for your Product Using Generate Barcode Button.
                </p>
              </div>
            </Row>
            <a href="login" className="btn1">
              Login or SignUp
            </a>
            <br />
            <br />
            <hr />
            
            <a href="barcode" className="btn1">
              Generate Barcode for Products
            </a>
          </Container>
        </section>
      </header>
    );
  }
}

export default Header;
