import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import { ToastContainer } from "react-toastify";
import { Route } from "react-router-dom";

import "./App.css";

import NavBar from "./components/NavBar";
import User from "./components/User";
import Users from "./components/Users";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToastContainer />
        <NavBar />
        <hr />
        <Container>
          <Row>
            <Col>
              <Route path="/users/" render={props => <Users {...props} />} />
              <Route
                path="/users/:username"
                render={props => <User {...props} />}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
