import React from "react";
import { graphql } from "react-apollo";
import { Route, Redirect } from "react-router-dom";

import SelectUser from "./Users";
import { SELECTED_USER } from "./queries";
import User from "./Edit";

const Users = ({
  history,
  data: {
    appState: { selectedUser }
  }
}) => {
  return (
    <div>
      <h2>Users</h2>
      <SelectUser username={selectedUser} history={history} />
      <Route
        path="/users/:username"
        render={props =>
          selectedUser ? <User {...props} /> : <Redirect to="/users" />
        }
      />
    </div>
  );
};

export default graphql(SELECTED_USER)(Users);
