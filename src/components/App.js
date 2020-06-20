import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { HashRouter as Router, Link } from "react-router-dom";
import Control from "./Control";
import image from "../assets/covid.png";

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
        <Navbar.Brand>
          <Link to="/">
            <img
              src={image}
              width="50"
              height="50"
              margin-right="10px"
              alt="logo"
            />
          </Link>
          COVID-19 Dashboard
        </Navbar.Brand>

        <Nav className="ml-auto">
          <Nav.Link href="#/">Home</Nav.Link>
          <Nav.Link href="#/map">Map</Nav.Link>
        </Nav>
      </Navbar>
      <Control />
    </Router>
  );
};

export default App;
