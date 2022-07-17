import React, { useEffect, useState, useRef } from "react";
import Navigationbar from "../layout/Navbar";
import { Form, Col, Button, Container } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import QRCode from "react-qr-code";
//generating barcode using react-barcode-reader
function Barcodegen() {
  const [data, setData] = useState("jana");
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <Navigationbar />
      <div className="banner33">
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label id="clr">
            {" "}
            Enter Product Name and Price (by seperating '/' Eg: Note Book/50){" "}
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Product Name and Price by Seperating /"
            onChange={(e) => setData(e.target.value)}
          />
        </Form.Group>
        <br />
        <br />
        <br />
        <div ref={componentRef}>
          <Container>
            <QRCode value={data} />
          </Container>
        </div>

        <br />
        <hr />
        <br />
        <Button
          variant="primary"
          className="float-center"
          onClick={handlePrint}
        >
          Download
        </Button>
      </div>
    </div>
  );
}
export default Barcodegen;
