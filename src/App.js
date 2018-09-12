import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import { ToastContainer } from "react-toastify";
import { Route } from "react-router-dom";

import "./App.css";

import NavBar from "./components/NavBar";
import Users from "./components/Users";
import Questions from "./components/Questions";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToastContainer />
        <Route path="/" render={props => <NavBar {...props} />} />
        <hr />
        <Container>
          <Row>
            <Col>
              <Route path="/users" render={props => <Users {...props} />} />
              <Route
                path="/questions"
                render={props => <Questions {...props} />}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
