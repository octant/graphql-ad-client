import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import UserInfo from "../components/UserInformation";

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/profile" component={UserInfo} />
      </BrowserRouter>
    );
  }
}

export default Router;
