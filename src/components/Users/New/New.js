import React from "react";

import userInformation from "./schema";
import Form from "../../../lib/validated-form";
import Layout from "../../../lib/validated-form/reactstrap";

const UserForm = ({ values, submit }) => {
  return (
    <div>
      <Form
        definition={userInformation}
        layout={Layout}
        onSubmit={submit}
        values={{ ...values }}
      />
    </div>
  );
};

export default UserForm;
