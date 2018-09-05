import React from "react";
import { Route } from "react-router-dom";

import EditUser from "./Edit";
import ListUsers from "./List";
import ShowUser from "./Show";

const Users = () => {
  return (
    <div>
      <h3>Users</h3>

      <Route path="/users" exact render={props => <ListUsers {...props} />} />

      <Route
        path="/users/:username/edit"
        render={props => <EditUser {...props} />}
      />

      <Route
        path="/users/:username"
        render={props => <ShowUser {...props} />}
      />
    </div>
  );
};

export default Users;
