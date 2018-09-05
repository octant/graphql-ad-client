import React from "react";
import { Route } from "react-router-dom";

import EditUser from "./Edit";
import ListUsers from "./List";
import NewUser from "./New";
import ShowUser from "./Show";

const Users = props => {
  return (
    <div>
      <h3>Users</h3>

      <Route path="/users" exact render={props => <ListUsers {...props} />} />

      <Route path="/users/new" exact render={props => <NewUser {...props} />} />

      <Route
        path="/users/:username/show"
        exact
        render={props => <ShowUser {...props} />}
      />

      <Route
        path="/users/:username/edit"
        exact
        render={props => <EditUser {...props} />}
      />
    </div>
  );
};

export default Users;
