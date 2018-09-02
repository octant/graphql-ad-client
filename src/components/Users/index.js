import React from "react";
import { graphql } from "react-apollo";

import SelectUser from "./forms/Users";
import { SELECTED_USER } from "./queries";

const Users = ({ history, data: { selectedUser } }) => {
  return (
    <div>
      <h2>Users</h2>
      <SelectUser username={selectedUser} history={history} />
    </div>
  );
};

export default graphql(SELECTED_USER)(Users);
