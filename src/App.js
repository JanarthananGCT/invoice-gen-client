import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/layout/Header";
import Home from "./components/pages/invoice";
import Register from "./components/auth/Register";
import Barcodegen from "./components/pages/barcodegen";
import Login from "./components/auth/Login";

import UserContext from "./context/userContext";
import "./App.css";

import About from "../src/components/pages/about.js";
import Contact from "../src/components/pages/contact.js";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.post(
        "https://invoice-generator-using-mern.herokuapp.com/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenResponse.data) {
        const userRes = await axios.get("https://invoice-generator-using-mern.herokuapp.com/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Switch>
          <Route exact path="/" component={Header} />{" "}
          <Route path="/signup" component={Register} />{" "}
          <Route path="/About" component={About} />{" "}
          <Route path="/barcode" component={Barcodegen} />{" "}
          <Route path="/Contact" component={Contact} />{" "}
          <Route path="/login" component={Login} />{" "}
          <Route path="/invoice" component={Home} />{" "}
        </Switch>{" "}
      </UserContext.Provider>{" "}
    </BrowserRouter>
  );
}

export default App;
