import React from "react";

import SelectUser from "./forms/Users";

const Users = ({ history }) => {
  return (
    <div>
      <h2>Users</h2>
      <SelectUser history={history} />
    </div>
  );
};

export default Users;
