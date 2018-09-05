import React from "react";
import { graphql } from "react-apollo";
import { Route, Redirect } from "react-router-dom";

import { SELECTED_USER } from "./queries";
import EditUser from "./Edit";
import SelectUser from "./Users";

const Users = ({
  history,
  data: {
    loading,
    appState: { selectedUser }
  }
}) => {
  return (
    <div>
      <h2>Users</h2>
      <SelectUser username={selectedUser} history={history} />
      {loading ? (
        "loading..."
      ) : (
        <Route
          path="/users/:username"
          render={props =>
            selectedUser ? <EditUser {...props} /> : <Redirect to="/users" />
          }
        />
      )}
    </div>
  );
};

export default graphql(SELECTED_USER)(Users);
