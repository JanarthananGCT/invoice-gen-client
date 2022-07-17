import React, { useEffect, useContext, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import { Container, Form, Button, Card, Col } from "react-bootstrap";
import QRCode from "qrcode.react";
import BarcodeReader from "react-barcode-reader";
import { useReactToPrint } from "react-to-print";




var array = [];

function Home() {
  //to generate date , time ,billno
  var today = new Date();
  var date =
    today.getDate() + ":" + (today.getMonth() + 1) + ":" + today.getFullYear();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var billno =
    today.getDate() +
    (today.getMonth() + 1) +
    today.getHours() +
    today.getMinutes();
  //geting input from barcode scanner using useState()
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();
  const [noOfRows, setNoOfRows] = useState(1);
  const componentRef = useRef();
  const [amount, setAmount] = useState(0);
  const [bardata, setBardata] = useState("Default/20");
  const [status, setStatus] = useState();
  //to print bills
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  var dataArray = bardata.split("/");
  //to generate UPI QR code
  var upiString =
    "upi://pay?pa=" +
    userData.user.Account_number +
    "@" +
    userData.user.IFSC_CODE +
    ".ifsc.npci&pn=" +
    userData.user.Name +
    "&am=" +
    amount;
  const handleError = (err) => {
    console.error(err);
  };
  //logout
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    history.push("/");

    localStorage.setItem("auth-token", "");
  };

  useEffect(() => {
    if (!userData.user) history.push("/");
  }, []);

  return (
    <div>
      <div className="invoice">
        <BarcodeReader
          onError={handleError}
          onScan={(e) => setBardata(e.target.value)}
        />
        
        <Container className="valign">
          <Card className="text-center" ref={componentRef}>
            <Card.Header>
              <p className="d-block">
                <Card.Title>
                  <h2>{userData.user.displayName}</h2>
                </Card.Title>
                <Card.Text className="float-start">
                  Date: {date}
                  <br />
                  Time: {time}
                </Card.Text>

                <Card.Text className="float-end">
                  BillNo:{billno} <br /> status : {status}
                </Card.Text>
              </p>
            </Card.Header>
            <Card.Body className="bd">
              <Container>
                <table class="table table-hover table-bordered" id="tab">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col" className="name1">
                        Product Name
                      </th>
                      <th scope="col">Price</th>
                      <th scope="col" colspan="1">
                        Quantity
                      </th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(noOfRows)].map((elementInArray, index) => {
                      const handleChange = () => {
                        var quantity = document.getElementById(
                          (index + 1) * 10000
                        ).value;

                        var total = Number(dataArray[1] * quantity);

                        array[index] = total;
                        var ans = array.reduce((a, b) => a + b);

                        document.getElementById(index).innerHTML = total;
                        document.getElementById("net").innerHTML = ans;
                      };

                      return (
                        <>
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td className="name1">{dataArray[0]}</td>
                            <td>{dataArray[1]}</td>
                            <td>
                              <input
                                className="inpt"
                                id={(index + 1) * 10000}
                                type="number"
                                onChange={handleChange}
                              />
                            </td>
                            <td className="tot">
                              <h3 id={index} className="tt"></h3>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                    <tr>
                      <td colspan="4">Net Total</td>
                      <td
                        id="net"
                        className="tot"
                        onChange={(e) => setAmount(e.target.value)}
                      ></td>
                    </tr>
                  </tbody>
                </table>
              </Container>
              <button
                type="button"
                class="btn btn-primary me-3 float-start d-print-none"
                onClick={() => setNoOfRows(noOfRows + 1)}
              >
                Add New
              </button>
              <button
                type="button"
                class="btn btn-danger float-end d-print-none"
                onClick={() => (setNoOfRows(0)&&setAmount(0))}
              >
                + New Bill
              </button>
              <button
                type="button"
                class="btn btn-danger float-center d-print-none"
                onClick={() =>
                  setNoOfRows(noOfRows - 1) && (array[noOfRows] = "/0")
                }
              >
                Delete
              </button>
            </Card.Body>

            <Card.Footer>
              <span className="float-start">
                <Form.Check
                  aria-label="option 1"
                  label="UPI"
                  onClick={(e) => setStatus("UPI")}
                />{" "}
              </span>

              <span className="float-start">
                <Form.Check
                  aria-label="option 1"
                  label="Cash"
                  onClick={(e) => setStatus("Cash")}
                />{" "}
              </span>

              <Button
                variant="primary"
                className="float-center"
                onClick={handlePrint}
              >
                Amount Paid
              </Button>
              <br />
              <br />

              <Button
                variant="primary"
                className="float-end d-print-none"
                onClick={logout}
              >
                Logout
              </Button>
            </Card.Footer>
          </Card>
          <br />
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Ammount Need to Pay ( in UPI)</Form.Label>
            <br />
            <input type="number" onChange={(e) => setAmount(e.target.value)} />
          </Form.Group>
          <br />

          <QRCode value={upiString} />
        </Container>
      </div>
    </div>
  );
}

export default Home;
