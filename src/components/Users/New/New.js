import React from "react";

import newUser from "./schema";
import Form from "../../../lib/validated-form";
import Layout from "../../../lib/validated-form/reactstrap";

const NewUserForm = ({ users, values, submit }) => {
  return (
    <div>
      <Form
        definition={newUser(users)}
        layout={Layout}
        onSubmit={submit}
        values={{ ...values }}
      />
    </div>
  );
};

export default NewUserForm;
