import React from "react";
import { Navbar, Container, Nav, Image } from "react-bootstrap";
import king from "../images/king.png";
//navbar 
function Navigationbar() {
  return (
    <div>
      <Navbar expand="lg" className="view ms-auto">
        <Container fluid>
          <Navbar.Brand href="/">
            <Image
              alt=""
              src={king}
              width="30"
              height="30"
              className="d-inline-block align-top"
            ></Image>
            {""}
            MakerZ
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/" className="navitem">
                Home
              </Nav.Link>
              <Nav.Link href="/About" className="navitem">
                About
              </Nav.Link>
              <Nav.Link href="/Contact" className="navitem">
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigationbar;
