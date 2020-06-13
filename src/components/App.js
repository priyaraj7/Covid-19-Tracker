import React from "react";
import { Navbar } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Control from "./Control";

const App = () => {
  return (
    <Router>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        sticky="top"
      >
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Brand href="/map">map</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      </Navbar>
      <Control />
    </Router>
  );
};

export default App;
