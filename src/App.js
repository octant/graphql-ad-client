import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";

import logo from "./logo.svg";
import "./App.css";

import UserInfo from "./components/UserInformation";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <ToastContainer />
        <Container>
          <Row>
            <Col>
              <UserInfo notify={toast} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
