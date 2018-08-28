import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import { ToastContainer } from "react-toastify";
import { Route } from "react-router-dom";

import "./App.css";

import NavBar from "./components/NavBar";
import UserInfo from "./components/UserInformation";

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
              <Route path="/me" component={UserInfo} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
